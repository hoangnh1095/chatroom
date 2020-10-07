const TOKEN =
  "eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTSzVrMTFCNm9VSnZaeUZ4RUhZMWRleGJqTjdBUjZKS0Z0LTE2MDIwODgzNTkiLCJpc3MiOiJTSzVrMTFCNm9VSnZaeUZ4RUhZMWRleGJqTjdBUjZKS0Z0IiwiZXhwIjoxNjAyMTc0NzU5LCJyZXN0X2FwaSI6dHJ1ZX0.HuGbYe66gaaV_JM4Qto6SwPYWr-AMhvq-k9jYMVdz-k";
const BASE_URL = "https://api.stringee.com/v1/room2";

async function createRoom() {
  const roomName = Math.random().toFixed(4);
  const call = await axios.post(
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

  const room = call.data;
  console.log({ room });
  return room;
}

async function listRoom() {
  const call = await axios.get(`${BASE_URL}/list`, {
    headers: {
      "X-STRINGEE-AUTH": TOKEN
    }
  });

  const rooms = call.data.list;
  console.log({ rooms });
  return rooms;
}

async function getToken() {
  return {
    userToken: "",
    roomToken: ""
  };
}
