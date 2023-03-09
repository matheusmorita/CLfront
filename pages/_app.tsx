/* eslint-disable react-hooks/exhaustive-deps */
import '@/styles/globals.scss'
import "bootstrap/dist/css/bootstrap.min.css"
import type { AppProps } from 'next/app'
import React, { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import { socket, WebSocketProvider } from '@/context/WebSocketContext'
import { handleUserSession } from '@/utils/fetchDataAxios'

//contexts
import UserContext from '@/context/UserContext'
import ProjectContext from '@/context/ProjectContext';

import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config.js';

function App({ Component, pageProps }: AppProps) {
  const [userInfo, setUserInfo] = useState()
  const [loggedIn, setLoggedIn] = useState(false)
  const [projectSelectedContext, setProjectSelectedContext] = React.useState<any>();

  const router = useRouter()
  const { locale } = router;


  useEffect(() => {
    let token = localStorage.getItem('accessToken')
    handleUserSession(setUserInfo, setLoggedIn, token, router)
  }, [])

  return (
    <WebSocketProvider value={socket}>
      <ProjectContext.Provider
        value={{
          projectSelectedContext,
          setProjectSelectedContext
        }}
      >
        <UserContext.Provider
          value={{
            userInfo: [userInfo, setUserInfo],
            loggedIn: [loggedIn, setLoggedIn],
            locale
          }}
        >
          <Component {...pageProps} />
        </UserContext.Provider>
      </ProjectContext.Provider>
    </WebSocketProvider>
  )
}

export default appWithTranslation(App, nextI18NextConfig)
