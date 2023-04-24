import axios from "axios";
import { formatOnlyDate } from "./formatDate";

export async function fetchDataAxios(limit, setProjects) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_PROJETO_URL}limit=${limit}`,
    {
      headers: {
        "Content-Type": "application/json"
      },
    }
  )


  setProjects(response.data)
  return response.data
}

export async function getProjectsUnlimited(setProjects) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_PROJETO_URL}`,
    {
      headers: {
        "Content-Type": "application/json"
      },
    }
  )


  setProjects(response.data)
  return response.data
}

export async function fetchDataIdAxios(id, setProject) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_PROJETO_ID_URL}${id}`, {
    headers: {
      "Content-Type": "application/json"
    }
  })


  setProject(response.data)
}

export async function fetchDataIdAxiosWithFunction(id, setProject, handleSetInfoUpdate) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_PROJETO_ID_URL}${id}`, {
    headers: {
      "Content-Type": "application/json"
    }
  })

  const data = response.data
  const {
    nome,
    rentabilidade,
    acronimo,
    dataLancamento,
    descricao,
    resumo,
    tipoToken,
    faseDoProjeto
  } = data;

  const dateFormated = formatOnlyDate(dataLancamento)

  handleSetInfoUpdate(nome, acronimo, tipoToken, dateFormated, resumo, descricao, rentabilidade, faseDoProjeto)
  setProject(data)
  return faseDoProjeto
}


export async function fetchDataUserInfo(accessToken, setDataUser, router) {
  var config = {
    method: "post",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
  };

  const response = await fetch(process.env.NEXT_PUBLIC_GET_USER_INFO, config)

  const data = await response.json()

  setDataUser(data)
  console.log(data)
  
  if (!data?.isAdmin && router.asPath.includes('admin')) {
    router.push('/notfound')
  }
}

export async function fetchUserHistoryinfo(accessToken, setHistoryUser, historyUser) {
  var config = {
    method: "post",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
  };

  const response = await fetch(process.env.NEXT_PUBLIC_GET_TRANSACTIONS, config)

  const data = await response.json()
  // console.log(data)
  setHistoryUser(data)
}

export async function fetchRequestPix(accessToken, quantity, setWaiting) {
  console.log('Criando PIX')
  let newQuantity = quantity
  if (newQuantity.includes(',')) {
    const replaceDot = quantity.replace(',', '.')
    newQuantity = Number(replaceDot).toFixed(2).toString()
  }

  var dataBody = JSON.stringify({
    quantity: newQuantity,
  });

  var config = {
    method: "post",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: dataBody
  };
  setWaiting(true)
  const response = await fetch(process.env.NEXT_PUBLIC_GERAR_PIX, config)
  const dataResponse = await response.json()
  setWaiting(false)
  return {
    itemId: dataResponse?.data?.items[0]?.itemId,
    textContent: dataResponse?.data?.items[0]?.data.textContent
  }
}

export async function requestBuyToken(accessToken, quantity, loteId, setWaiting, setResponseCode) {
  const dataBody = JSON.stringify({
    quantity: Number(quantity).toFixed(2).toString(),
    loteId
  })

  console.log(Number(quantity).toFixed(2).toString())

  const config = {
    method: "post",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: dataBody
  }

  setWaiting(true)
  const response = await fetch(process.env.NEXT_PUBLIC_COMPRAR_TOKEN, config)
  setResponseCode(response.status)
  const dataResponse = await response.json()
  setWaiting(false)

  return {
    hash: dataResponse.transactionHash,
    confirm: dataResponse.confirmations,
    responseStatus: response.status
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

    await fetch(process.env.NEXT_PUBLIC_REQUEST_LOGIN, config)
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

export const handleGetUserInfo = async (setSuccess, setPreloaded, router) => {
  const token = localStorage.getItem('accessToken')

  const config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      "Authorization": 'Bearer ' + token,
    }
  }

  await fetch(process.env.NEXT_PUBLIC_GET_USER_CADASTRO, config)
    .then(resp => {
      console.log(resp)
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

export const handleUserRequestRegister = async (setWaiting, setSuccess, name, cpf, date, validation, router, setCpfValid) => {
 
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

      await fetch(process.env.NEXT_PUBLIC_CADASTRAR_USER, config)
        .then(resp => {
          if (resp.status === 400) {
            setCpfValid(true)
            setWaiting(false)
          }
          if (resp.ok) {
            setWaiting(false)
            setSuccess(true)
            setTimeout(() => {
              router.push('/perfil')
            }, 3000);
          }
        })
    }
    
  }
}

export const handleGetUserInfoCadastro = async (token, router) => {
  const config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      "Authorization": 'Bearer ' + token,
    }
  }

  await fetch(process.env.NEXT_PUBLIC_GET_USER_CADASTRO, config)
    .then(resp => {
      if (resp.ok) {
        return 
        router.push('/perfil')
        
      } else {
        router.push('/registrar-se')
      }
    })
}

export const handleUserSession = async (setUserInfo, setLoggedIn, token, router) => {
  if (token) {
    var config = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    };
    const response = await fetch(process.env.NEXT_PUBLIC_GET_USER_INFO, config)

    const data = await response.json()

    if (data.nome) {
      setUserInfo(data)
      setLoggedIn(true)
      handleGetUserInfoCadastro(token)
    }

  }
}

export const uploadProfilePhoto = async (photoFile, accessToken) => {
  let formData = new FormData();
  formData.append("file", photoFile);


  await axios.post(process.env.NEXT_PUBLIC_UPLOAD_PROFILE_PHOTO, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${accessToken}`
    },
  });
}

export const uploadBackgroundPhoto = async (photoFile, accessToken) => {
  let formData = new FormData();
  formData.append("file", photoFile);

  await axios.post(process.env.NEXT_PUBLIC_UPLOAD_BACKGROUND_PHOTO, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${accessToken}`
    },
  });
}


export const handleAuthLogin = async (setUserInfo, setLoggedIn, token, router) => {
  var data = JSON.stringify({
    'tokenId': token
  });

  var config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data
  };

  await fetch(process.env.NEXT_PUBLIC_AUTH_LOGIN, config)
    .then(resp => resp.json())
    .then(json => {
      if (json.accessToken && json.refreshToken) {
        localStorage.setItem('accessToken', json.accessToken)
        localStorage.setItem('refreshToken', json.refreshToken)
        setUserInfo(json.usuarioInfo)
        setLoggedIn(true)
      }
    })
    .then(() => {
      handleGetUserCadastro(router)
    })
}

const handleGetUserCadastro = async (router) => {
  const token = localStorage.getItem('accessToken')

  const config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      "Authorization": 'Bearer ' + token,
    }
  }

  await fetch(process.env.NEXT_PUBLIC_GET_USER_CADASTRO, config)
    .then(resp => {
      if (resp.ok) {
        router.push('/perfil')
      } else {
        router.push('/registrar-se')
      }
    })
}

export const uploadDocumentsProject = async (id, files, accessToken) => {
  const formData = new FormData()

  formData.append('id', id)

  for (let i = 0; i < files.length; i++) {
    formData.append(`file${i + 1}`, files[i][0])
  }

  const response = await axios.patch(process.env.NEXT_PUBLIC_UPLOAD_DOCUMENTS_PROJETO, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      "Authorization": `Bearer ${accessToken}`
    },
  })

  console.log(response)

  return response.status
}

export const uploadDataFormCreateProject = async (data, accessToken, setWaiting) => {

  const dataJson = JSON.stringify(data)

  setWaiting(true)
  const { data: { id } } = await axios.post(process.env.NEXT_PUBLIC_CRIAR_PROJETO, dataJson, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
  })
  // console.log('id response: ', id)
  setWaiting(false)

  return {
    responseID: id
  }
}

export const uploadBackgroundProject = async (id, backgroundFile, accessToken) => {
  const formData = new FormData()

  formData.append('id', id)

  formData.append('file', backgroundFile)

  await axios.patch(process.env.NEXT_PUBLIC_UPLOAD_BACKGROUND_PROJETO, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      "Authorization": `Bearer ${accessToken}`
    },
  }).then((response => {
    if (response.status === 200) {
      console.log('background Uploaded')
    }
  }))
}

export const deleteProject = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const response = await axios.delete(process.env.NEXT_PUBLIC_DELETE_PROJETO + id, config)

  return response.status
}

export const updateProject = async (id, data) => {

  const bodyStringfy = JSON.stringify(data)

  const response = await axios.patch(process.env.NEXT_PUBLIC_UPDATE_PROJETO + id, bodyStringfy, {
    headers: {
      "Content-Type": "application/json"
    }
  })

  console.log(response)

  return response.status
}

export const getEmissor = async (limit) => {
  const response = await fetch(process.env.NEXT_PUBLIC_GET_EMISSOR + limit)

  const data = await response.json()

  return data
}
