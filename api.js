const TOKEN = 'eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTSzVrMTFCNm9VSnZaeUZ4RUhZMWRleGJqTjdBUjZKS0Z0LTE2MDIwODQ0OTkiLCJpc3MiOiJTSzVrMTFCNm9VSnZaeUZ4RUhZMWRleGJqTjdBUjZKS0Z0IiwiZXhwIjoxNjAyMDg4MDk5LCJyZXN0X2FwaSI6dHJ1ZX0.7a8uAvye-QUf95ac65J0NBd4rOHp5q7MSsVcxkSajzE'
const BASE_URL = 'https://api.stringee.com/v1/room2'

async function createRoom(roomID) {
  const call = await axios.get(`${BASE_URL}/create`, {
    headers: {
      'X-STRINGEE-AUTH': TOKEN
    }
  })
  
  console.log(call)
}