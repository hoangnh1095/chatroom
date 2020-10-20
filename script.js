const videoContainer = document.querySelector("#videos");

const vm = new Vue({
  el: "#app",
  data: {
    userToken: "",
    roomId: "",
    roomToken: "",
    room: undefined,
    callClient: undefined,
    joinRoom: false
  },
  computed: {
    roomUrl: function() {
      return `https://${location.hostname}?room=${this.roomId}`;
    }
  },
  async mounted() {
    api.setRestToken();

    const urlParams = new URLSearchParams(location.search);
    const roomId = urlParams.get("room");
    if (roomId) {
      this.roomId = roomId;
      this.joinRoom = true;

      await this.join();
    }
  },
  methods: {
    subscribe: async function(trackInfo) {
      const track = await this.room.subscribe(trackInfo.serverId);
      track.on("ready", () => {
        const videoElement = track.attach();
        this.addVideo(videoElement);
      });
    },
    addVideo: function(video) {
      video.setAttribute("controls", "true");
      if (api.isSafari()) {
        video.setAttribute("muted", "true");
        video.setAttribute("playsinline", "true");
      }

      videoContainer.appendChild(video);
    },
    authen: function() {
      return new Promise(async resolve => {
        const userId = `${(Math.random() * 100000).toFixed(6)}`;
        const userToken = await api.getUserToken(userId);
        this.userToken = userToken;

        if (!this.callClient) {
          const client = new StringeeClient();

          client.on("authen", function(res) {
            console.log("on authen: ", res);
            resolve(res);
          });
          this.callClient = client;
        }
        this.callClient.connect(userToken);
      });
    },
    publish: async function(screenSharing = false) {
      const localTrack = await StringeeVideo.createLocalVideoTrack(
        this.callClient,
        {
          audio: true,
          video: true,
          screen: screenSharing,
          videoDimensions: { width: 640, height: 360 }
        }
      );

      console.log({ localTrack });
      const videoElement = localTrack.attach();
      this.addVideo(videoElement);

      const roomData = await StringeeVideo.joinRoom(
        this.callClient,
        this.roomToken
      );
      console.log({ roomData });
      const room = roomData.room;

      this.room = room;
      console.log({ room });
      room.clearAllOnMethos();

      room.on("addtrack", e => {
        const track = e.info.track;

        console.log("addtrack", track);
        if (track.serverId === localTrack.serverId) {
          console.log("local");
          return;
        }
        this.subscribe(track);
      });
      room.on("removetrack", e => {
        const track = e.track;
        if (!track) {
          return;
        }

        const mediaElements = track.detach();
        mediaElements.forEach(element => element.remove());
      });

      await room.publish(localTrack);
      console.log("room publish successful");
      roomData.listTracksInfo.forEach(info => this.subscribe(info));
    },
    createRoom: async function() {
      const room = await api.createRoom();
      const { roomId } = room;
      const roomToken = await api.getRoomToken(roomId);

      this.roomId = roomId;
      this.roomToken = roomToken;
      console.log({ roomId, roomToken });

      // Create xong join room lun
      await this.authen();
      await this.publish();
    },
    join: async function() {
      const roomToken = await api.getRoomToken(this.roomId);
      this.roomToken = roomToken;

      await this.authen();
      await this.publish();
    },
    joinWithId: async function() {
      const roomId = prompt('Dán Room ID vào đây nhé!');
      if (roomId) {
        this.roomId = roomId;
        this.joinRoom = true;
        await this.join();
      }
    }
  }
});
