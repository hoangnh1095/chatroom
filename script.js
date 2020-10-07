const vm = new Vue({
  el: "#app",
  data: {
    message: "🐵 Hello World 🔮",
    userId: '',
    roomId: '',
    joinRoom: false,
  },
  computed: {
    roomUrl: function() {
      return `https://${location.hostname}?room=${this.roomId}`
    }
  },
  async mounted() {
    this.userId = window.prompt('Bạn tên gì ahihi?')
    
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
    },
    createRoom: async function () {
      const room = await createRoom()
      const {roomId} = room
      this.roomId = roomId
      console.log({roomId})
      
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
