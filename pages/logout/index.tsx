/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Frame from '@/templates/Frame'
import Head from 'next/head'
import Section from '@/components/organisms/Section'
import Loader from '@/components/atoms/Loader'
import Styles from './styles.module.scss'
import { useRouter } from 'next/router'
import UserContext from '@/context/UserContext'

const Logout = () => {
  const router = useRouter()
  const { userInfo, loggedIn } = React.useContext(UserContext)
  const [info, setUserInfo] = userInfo
  const [logged, setLoggedIn] = loggedIn

  const handleUserLogout = () => {
    localStorage.clear()
    setLoggedIn(false)
    setUserInfo(null)
    setTimeout(() => {
      router.push('/')
    }, 1500);
  }

  React.useEffect(() => {
    handleUserLogout()
  }, [])

  return (
    <Frame
      id='logout'
      role='main'
      label='Página de logout'
    >
      <Head>
        <title>CoinLivre | logout</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#00ee8d" />
        <meta name="robots" content="no-index, no-follow" />
        <meta name="description" content="CoinLivre | logout." />
      </Head>
      <Section
        id='logout'
        label='logout-title'
        desc='logout-description'
        justify='center'
        hidden={false}
        className={`${Styles.logout} pt-5 pt-lg-0 d-flex align-items-center pb-5`}
      >
        <Loader
          active={true}
          absolute={false}
        />
      </Section>
    </Frame>
  )
}

export default Logout