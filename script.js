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
    login: async function() {
      this.userId = `hoang_dep_trai_${Math.random().toFixed(4) * 1000}`; // window.prompt('Bạn tên gì ahihi?')

      const userToken = await api.getUserToken(this.userId);
      this.userToken = userToken;

      if (!this.callClient) {
        const client = new StringeeClient();

        client.on("authen", function(res) {
          console.log("on authen: ", res);
        });
        this.callClient = client;
      }
      this.callClient.connect(userToken);
      
      const localTrack = await StringeeVideo.createLocalVideoTrack(this.callClient, {
        audio: true, video: true, screen: false, videoDimensions: {width: 640, height: 360}
      })
      
      console.log({localTrack});
      videoContainer.appendChild(localTrack.attach());
      
      const room = await StringeeVideo.joinRoom(this.callClient, this.roomToken);
      console.log({room})
      room.clearAllOnMethos();
      room.on('message', (e) => {console.log('on message, e')});
      
      await room.publish(localTrack)
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
    joinRoom: async function() {
      // Lay room id
      // Lay room token
      // join room lam tro
    }
  }
});

vm.message = "hoang_cute";
