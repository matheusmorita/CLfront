import axios from "axios";

export async function fetchDataAxios(limit, setProjects) {
  const response = await axios.get(`https://coinlivre.blocklize.io/projeto/retornar?limit=${limit}`,
    {
      headers: {
        "Content-Type": "application/json"
      },
    }
  )
  setProjects(response.data)
}

export async function fetchDataIdAxios(id, setProject) {
  const response = await axios.get(`https://coinlivre.blocklize.io/projeto/retornar/${id}`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  setProject(response.data)
}


export async function fetchDataUserInfo (accessToken, setBalance, setDataUser) {
  var config = {
    method: "post",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
  };
  
  const response = await fetch("https://coinlivre.blocklize.io/usuario/getUserInfo", config)
  
  const data = await response.json()
  setDataUser(data)
  setBalance(data.balanceCL)
  
}

export async function fetchUserHistoryinfo (accessToken, setHistoryUser, historyUser) {
  var config = {
    method: "post",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
  };
  
  const response = await fetch("https://coinlivre.blocklize.io/token/findTransactions ", config)
  
  setHistoryUser(await response.json())
}

export async function fetchRequestPix (accessToken, quantity) {
  let newQuantity = ''
  if (quantity.includes(',')) {
    newQuantity = quantity.replace(',', '.')
  } else {
    newQuantity = `${quantity}.00`
  }
  var dataBody = JSON.stringify({
    "quantity": newQuantity
  });

  var config = {
    method: "post",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: dataBody
  };
  
  const response = await fetch("https://coinlivre.blocklize.io/token/criar-ordem-pix", config)
  
  const dataResponse = await response.json()
  return {
    itemId: dataResponse.data.items[0].itemId,
    textContent: dataResponse.data.items[0].data.textContent
  }
}

export async function requestBuyToken (accessToken, quantity, loteId) {
  let newQuantity = ''
  if (quantity.includes(',')) {
    newQuantity = quantity.replace(',', '.')
  } else {
    newQuantity = `${quantity}.00`
  }

  const dataBody = JSON.stringify({
    quantity: newQuantity,
    loteId
  })

  const config = {
    method: "post",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: dataBody
  }

  const response = await fetch("https://coinlivre.blocklize.io/token/comprar-token", config)

  const dataResponse = await response.json()

  return {
    hash: dataResponse.transactionHash,
    confirm: dataResponse.confirmations
  }
}
