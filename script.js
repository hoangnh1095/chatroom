const videoContainer = document.querySelector('#videos')

const vm = new Vue({
  el: "#app",
  data: {
    message: "🐵 Hello World 🔮",
    userId: "",
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
    }
  },
  methods: {
    subscribe: async function(trackInfo) {
      const track = await this.room.subscribe(trackInfo.serverId)
      track.on('ready', () => {
         videoContainer.appendChild(track.attach());
      })
    },
    authen: function() {
      return new Promise(async(resolve) => {
        this.userId = `hoang_dep_trai_${Math.random().toFixed(4) * 1000}`; // window.prompt('Bạn tên gì ahihi?')

      const userToken = await api.getUserToken(this.userId);
      this.userToken = userToken;

      if (!this.callClient) {
        const client = new StringeeClient();

        client.on("authen", function(res) {
          console.log("on authen: ", res);
          resolve(res)
        });
        this.callClient = client;
      }
        this.callClient.connect(userToken);  
      })
    },
    login: async function() {
      await this.authen();
      
      const localTrack = await StringeeVideo.createLocalVideoTrack(this.callClient, {
        audio: true, video: true, screen: false, videoDimensions: {width: 640, height: 360}
      })
      
      console.log({localTrack});
      videoContainer.appendChild(localTrack.attach());
      
      const roomData = await StringeeVideo.joinRoom(this.callClient, this.roomToken);
      console.log({roomData});
      const room = roomData.room;
      this.room = room;
      console.log({room})
      room.clearAllOnMethos();
      
      room.on('joinroom', (e) => console.log('on join room', e.info));
      room.on('message', (e) => {console.log('on message, e')});
      
      room.on('addtrack', (e) => {
        const track = e.info.track;
        
        console.log('addtrack', track);
        if (track.serverId === localTrack.serverId) {
          console.log('local')
          return
        }
        this.subscribe(track)
      })
      
      await room.publish(localTrack)
      console.log('room publish successful')
      roomData.listTracksInfo.forEach(info => this.subscribe(info))
    },
    createRoom: async function() {
      const room = await api.createRoom();
      const { roomId } = room;
      const roomToken = await api.getRoomToken(roomId);

      this.roomId = roomId;
      this.roomToken = roomToken;
      console.log({ roomId, roomToken });

      // Create xong join room lun
      await this.login();
    },
    join: async function() {
      // Lay room id
      // Lay room token
      const roomToken = await api.getRoomToken(this.roomId);
      this.roomToken = roomToken;
      
      await this.login();
    }
  }
});

vm.message = "hoang_cute";
