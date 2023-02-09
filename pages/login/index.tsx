/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Styles from './styles.module.scss'
import Frame from '@/templates/Frame'
import Head from 'next/head'
import Section from '@/components/organisms/Section'
import Column from '@/components/molecules/Column'
import Title from '@/components/atoms/Title'
import Form from '@/components/molecules/Form'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Logo from '@/components/atoms/Logo'
import Loader from '@/components/atoms/Loader'
import Paragrah from '@/components/atoms/Paragraph'
import UserContext from '@/context/UserContext'
import Check from '@/assets/img/Check.webp'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { captureEmail } from '@/assets/js/util/validations'

const Login = () => {
  const [email, setEmail] = React.useState()
  const [error, setError] = React.useState(false)
  const [waiting, setWaiting] = React.useState(false)
  const [feedback, setFeedback] = React.useState(false)

  const router = useRouter()
  const { userInfo, loggedIn } = React.useContext(UserContext)
  const [info, setUserInfo] = userInfo
  const [logged, setLoggedIn] = loggedIn

  const handleUserRequest = async () => {
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

      await fetch('https://greg.blocklize.io/auth/requestLogin', config)
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

  const handleWaitState = () => {
    return waiting ? Styles.waiting : null
  }

  React.useEffect(() => {
    if (logged) {
      router.push('/')
    }
  }, [logged])

  return (
    <main style={{ color: 'white' }}>
      <Frame
        id='login'
        role='main'
        label='Página de Login'
      >
        <Head>
          <title>CoinLivre | Login</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="theme-color" content="#00ee8d" />
          <meta name="robots" content="index, follow" />
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
            {!feedback && (
              <Form
                id='form'
                onSubmit={() => { }}
                label="Formulário de Lista VIP"
                className={`${Styles.form} ${handleWaitState()}`}
              >
                <Loader
                  active={waiting}
                  absolute={true}
                />
                <Title
                  id='form-title'
                  className='text-center fw-normal'
                  text='Login'
                  size={24}
                  hidden={false}
                />
                <Input
                  id='email'
                  label='Digite seu e-mail'
                  type='email'
                  onInput={setEmail}
                  validation={setError}
                  validator={captureEmail}
                  error={error}
                />
                <p className={Styles.form__desc}>
                  Esqueceu sua senha? Clique aqui
                  <br />
                  Ainda não tem uma conta? Cadastre-se
                </p>
                <Button
                  id="submit-button"
                  text="Entrar"
                  label="Clique e faça login em sua conta CoinLivre"
                  className="w-100 py-2 mt-2 fs-5"
                  hidden={false}
                  onClick={() => { handleUserRequest() }}
                />
              </Form>
            )}

            {feedback && (
              <Form
                id='form'
                onSubmit={() => { }}
                label="Formulário de Lista VIP"
                className={`${Styles.form} ${handleWaitState()}`}
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
                  text={'Um e-mail foi encaminhado para a sua caixa de entrada.'}
                  hidden={false}
                  width={100}
                />
                <Image
                  src={Check}
                  width={60}
                  height={60}
                  className='mb-4'
                  alt='Ícone de confirmação.'
                />
              </Form>
            )}
          </Column>
        </Section>

      </Frame>
    </main>
  )
}

export default Login