/* eslint-disable react-hooks/exhaustive-deps */
import '@/styles/globals.scss'
import "bootstrap/dist/css/bootstrap.min.css"
import type { AppProps } from 'next/app'
import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import UserContext from '@/context/UserContext'
import { socket, WebSocketProvider } from '@/context/WebSocketContext'

export default function App({ Component, pageProps }: AppProps) {
  const [userInfo, setUserInfo] = useState()
  const [loggedIn, setLoggedIn] = useState(false)

  const router = useRouter()
  const { locale } = router;

  const handleUserSession = () => {
    let token = localStorage.getItem('accessToken')
    if (token) {
      var config = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      };
      fetch('https://greg.blocklize.io/auth/userInfo', config)
        .then(resp => resp.json())
        .then(json => {
          if (json.email) {
            setUserInfo(json)
            setLoggedIn(true)
            handleGetUserInfo()
          }
        })
    }
  }

  const handleGetUserInfo = async () => {
    const token = localStorage.getItem('accessToken')

    const config = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        "Authorization": 'Bearer ' + token,
      }
    }

    await fetch('https://coinlivre.blocklize.io/usuario/getUserCadastro', config)
      .then(resp => {
        if (resp.ok) {
          // router.push('/')
        } else {
          // router.push('/registrar-se')
        }
      })
  }

  useEffect(() => {
    handleUserSession()
  }, [])

  return (
    <WebSocketProvider value={socket}>
      <UserContext.Provider
        value={{
          userInfo: [userInfo, setUserInfo],
          loggedIn: [loggedIn, setLoggedIn],
          locale
        }}
      >
        <Component {...pageProps} />
      </UserContext.Provider>
    </WebSocketProvider>
  )
}
