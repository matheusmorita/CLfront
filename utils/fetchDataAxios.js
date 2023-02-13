import axios from 'axios';

export async function fetchDataAxios(limit, setProjects) {
  const response = await axios.get(`https://coinlivre.blocklize.io/projeto/retornar`, {
    limit,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  console.log(response.data)
}

export async function fetchDataIdAxios(id) {
  const response = await axios.get(`https://coinlivre.blocklize.io/projeto/retornar/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  console.log(response.data)
}

export async function fetchDataUserInfo (accessToken) {
  const response = await axios.get(`https://coinlivre.blocklize.io/usuario/getUserInfo`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken
    }
  })
  console.log(response.data)
}