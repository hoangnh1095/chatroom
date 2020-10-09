const videoContainer = document.querySelector('#videos')

const vm = new Vue({
  el: "#app",
  data: {
    message: "🐵 Hello World 🔮",
    userId: "",
    userToken: "",
    roomId: "",
    roomToken: "",
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
      this.userId = "hoang_dep_trai"; // window.prompt('Bạn tên gì ahihi?')

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
