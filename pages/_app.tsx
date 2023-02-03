import '@/styles/globals.scss'
import "bootstrap/dist/css/bootstrap.min.css"
import type { AppProps } from 'next/app'
import { useState, useEffect } from "react"
import UserContext from '@/context/UserContext'

export default function App({ Component, pageProps }: AppProps) {
  const [userInfo, setUserInfo] = useState()
  const [loggedIn, setLoggedIn] = useState(false)

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
          console.log(json)
          if (json.email) {
            setUserInfo(json)
            setLoggedIn(true)
          }
        })
    }
  }

  useEffect(() => {
    handleUserSession()
  }, [])

  return (
    <UserContext.Provider
      value={{
        userInfo: [userInfo, setUserInfo],
        loggedIn: [loggedIn, setLoggedIn]
      }}
    >
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}
