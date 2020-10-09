const PROJECT_ID = "SK5k11B6oUJvZyFxEHY1dexbjN7AR6JKFt";
const PROJECT_SECRET = "YlJrUUh6bDJYcFZ2bVRiMTJQbjZHWU1lUVduODZZ";
const TOKEN =
  "eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTSzVrMTFCNm9VSnZaeUZ4RUhZMWRleGJqTjdBUjZKS0Z0LTE2MDIwODgzNTkiLCJpc3MiOiJTSzVrMTFCNm9VSnZaeUZ4RUhZMWRleGJqTjdBUjZKS0Z0IiwiZXhwIjoxNjAyMTc0NzU5LCJyZXN0X2FwaSI6dHJ1ZX0.HuGbYe66gaaV_JM4Qto6SwPYWr-AMhvq-k9jYMVdz-k";
const BASE_URL = "https://api.stringee.com/v1/room2";

class API {
  constructor(projectID, projectSecret) {
    this.projectID = projectID;
    this.projectSecret = projectSecret;
    this.restToken = '';
  }

  async  createRoom() {
    const roomName = Math.random().toFixed(4);
    const response = await axios.post(
      `${BASE_URL}/create`,
      {
        name: roomName,
        uniqueName: roomName
      },
      {
        headers: {
          "X-STRINGEE-AUTH": TOKEN
        }
      }
    );

    const room = response.data;
    console.log({ room });
    return room;
  }

  async listRoom() {
    const response = await axios.get(`${BASE_URL}/list`, {
      headers: {
        "X-STRINGEE-AUTH": TOKEN
      }
    });

    const rooms = response.data.list;
    console.log({ rooms });
    return rooms;
  }

  async getRestToken() {
    const response = await axios.get('https://v2.stringee.com/web-sdk-conference-samples/php/token_helper.php', {
      params: {
        keySid: this.projectID,
        keySecret: this.projectSecret,
        rest: true  
      }
    })
    
    // {
    //   rest_access_token: "",
    //   room_token: '',
    //   access_token: ''
    // };
    const tokens = response.data;
    console.log({tokens});
    return tokens
  }
}

const api = new API(PROJECT_ID, PROJECT_SECRET)