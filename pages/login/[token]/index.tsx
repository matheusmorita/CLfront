/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Styles from '../styles.module.scss'
import Frame from '@/templates/Frame'
import Head from 'next/head'
import Section from '@/components/organisms/Section'
import Column from '@/components/molecules/Column'
import Title from '@/components/atoms/Title'
import Form from '@/components/molecules/Form'
import Logo from '@/components/atoms/Logo'
import Loader from '@/components/atoms/Loader'
import Paragrah from '@/components/atoms/Paragraph'
import { useRouter } from 'next/router'
import UserContext from '@/context/UserContext'

const TokenShare = () => {
  const router = useRouter()
  const token = router.query.token
  const { userInfo, loggedIn } = React.useContext(UserContext)
  const [info, setUserInfo] = userInfo
  const [logged, setLoggedIn] = loggedIn

  const fetchData = async () => {
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

    await fetch('https://greg.blocklize.io/auth/login', config)
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
        handleGetUserInfo()
      })
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
          router.push('/')
        } else {
          // router.push('/registrar-se')
        }
      })
  }

  React.useEffect(() => {
    if (!token && localStorage.getItem('accessToken')) return
    fetchData()
  }, [router])

  return (
    <Frame
      id='login'
      role='main'
      label='Página de Login'
    >
      <Head>
        <title>CoinLivre | Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#00ee8d" />
        <meta name="robots" content="no-index, no-follow" />
        <meta name="description" content="CoinLivre | Login." />
      </Head>
      <Section
        id='login'
        label='login-title'
        desc='login-description'
        justify='center'
        hidden={false}
        className={`${Styles.login} pt-5 pt-lg-0 d-flex align-items-center pb-5`}
      >
        <Column
          size={4}
          media={'lg'}
          className='text-center'
        >

          <Logo
            white={true}
            width={300}
          />
          <Form
            id='form'
            onSubmit={() => { }}
            label="Formulário de Lista VIP"
            className={`${Styles.form}`}
          >
            <Title
              id='form-title'
              className='text-center fw-normal'
              text='Login'
              size={24}
              hidden={false}
            />
            <Paragrah
              id='form-description'
              text={'Aguarde, você será redirecionado.'}
              hidden={false}
              width={100}
            />
            <Loader
              active={true}
              absolute={false}
            />
          </Form>
        </Column>
      </Section>
    </Frame>
  )
}

export default TokenShare