import axios from "axios";

export async function fetchDataAxios(limit, setProjects) {
  const response = await axios.get(`${process.env.PROJETO_URL}limit=${limit}`,
    {
      headers: {
        "Content-Type": "application/json"
      },
    }
  )
  setProjects(response.data)
}

export async function fetchDataIdAxios(id, setProject) {
  const response = await axios.get(`${process.env.PROJETO_ID_URL}${id}`, {
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
  
  const response = await fetch(process.env.GET_USER_INFO, config)
  
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
  
  const response = await fetch(process.env.GET_TRANSACTIONS, config)
  
  const data = await response.json()
  console.log(data)
  setHistoryUser(data)
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
  
  const response = await fetch(process.env.GERAR_PIX, config)
  
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

  const response = await fetch(process.env.COMPRAR_TOKEN, config)

  const dataResponse = await response.json()

  return {
    hash: dataResponse.transactionHash,
    confirm: dataResponse.confirmations
  }
}

export const handleUserRequest = async (setWaiting, setFeedback, setError, email, error) => {
  if (email && !error) {
    setWaiting(true)
    const data = JSON.stringify({
      "email": email
    })

    const config = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: data
    }

    await fetch(process.env.REQUEST_LOGIN, config)
      .then(resp => {
        if (resp.ok) {
          setWaiting(false)
          setFeedback(true)
        }
      })
  } else {
    setError(true)
  }
}

export const handleGetUserInfo = async (setSuccess, setPreloaded) => {
  const token = localStorage.getItem('accessToken')

  const config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      "Authorization": 'Bearer ' + token,
    }
  }

  await fetch(process.env.GET_USER_CADASTRO, config)
    .then(resp => {
      if (resp.ok) {
        setSuccess(true)
        setPreloaded(true)
        setTimeout(() => {
          router.push('/')
        }, 3000);
      } else {
        setPreloaded(true)
      }
    })
}

export const handleUserRequestRegister = async (setWaiting, setSuccess, name, cpf, date) => {
  if (validation) {
    setWaiting(true)
    const token = localStorage.getItem('accessToken')
    if (token && name && cpf && date) {
      const data = JSON.stringify({
        "nome": name,
        "cpf": cpf,
        "dataNascimento": date
      })

      const config = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          "Authorization": 'Bearer ' + token,
        },
        body: data
      }

      await fetch(process.env.CADASTRAR_USER, config)
        .then(resp => {
          if (resp.ok) {
            setWaiting(false)
            setSuccess(true)
            setTimeout(() => {
              router.push('/')
            }, 3000);
          }
        })
    }
  }
}