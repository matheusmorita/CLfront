/* eslint-disable react-hooks/exhaustive-deps */
import '@/styles/globals.scss'
import "bootstrap/dist/css/bootstrap.min.css"
import type { AppProps } from 'next/app'
import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import UserContext from '@/context/UserContext'
import { socket, WebSocketProvider } from '@/context/WebSocketContext'
import { handleUserSession } from '@/utils/fetchDataAxios'

import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }: AppProps) {
  const [userInfo, setUserInfo] = useState()
  const [loggedIn, setLoggedIn] = useState(false)

  const router = useRouter()
  const { locale } = router;


  useEffect(() => {
    let token = localStorage.getItem('accessToken')
    handleUserSession(setUserInfo, setLoggedIn, token, router)
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

export default appWithTranslation(App)
