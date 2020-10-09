const vm = new Vue({
  el: "#app",
  data: {
    message: "🐵 Hello World 🔮",
    userId: '',
    userToken: '',
    roomId: '',
    roomToken: '',
    stringeeClient: undefined,
    joinRoom: false,
  },
  computed: {
    roomUrl: function() {
      return `https://${location.hostname}?room=${this.roomId}`
    }
  },
  async mounted() {
    api.setRestToken()
    
    this.userId = 'hoang dep trai' // window.prompt('Bạn tên gì ahihi?')
    
    const urlParams = new URLSearchParams(location.search)
    const roomId = urlParams.get('room')
    if (roomId) {
      this.roomId = roomId;
      this.joinRoom = true;
    }
  },
  methods: {
    login: async function() {
      // Lay token tu user_id
      api.getUserToken(this.userId)
    },
    createRoom: async function () {
      const room = await api.createRoom()
      const {roomId} = room
      const roomToken = await api.getRoomToken(roomId) 
      
      this.roomId = roomId
      this.roomToken = roomToken
      console.log({roomId, roomToken})
      
      // Create xong join room lun
    },
    joinRoom: async function () {
      // Lay room id
      
      // Lay room token
      
      // join room lam tro
    }
  }
});

vm.message = "hoang_cute";
