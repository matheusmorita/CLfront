/* eslint-disable react-hooks/exhaustive-deps */
import '@/styles/globals.scss'
import "bootstrap/dist/css/bootstrap.min.css"
import type { AppProps } from 'next/app'
import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import UserContext from '@/context/UserContext'
import { socket, WebSocketProvider } from '@/context/WebSocketContext'
import { handleUserSession } from '@/utils/fetchDataAxios'

export default function App({ Component, pageProps }: AppProps) {
  const [userInfo, setUserInfo] = useState()
  const [loggedIn, setLoggedIn] = useState(false)

  const router = useRouter()
  const { locale } = router;

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
          return
          // router.push('/')
        } else {
          // router.push('/registrar-se')
        }
      })
  }


  useEffect(() => {
    let token = localStorage.getItem('accessToken')
    handleUserSession(setUserInfo, setLoggedIn, handleGetUserInfo, token)
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
