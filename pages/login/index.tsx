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

// languages
import en from '@/public/locales/en/common.json';
import pt from '@/public/locales/pt/common.json';


import { handleUserRequest } from '@/utils/fetchDataAxios'

const Login = () => {
  const [email, setEmail] = React.useState()
  const [error, setError] = React.useState(false)
  const [waiting, setWaiting] = React.useState(false)
  const [feedback, setFeedback] = React.useState(false)

  const router = useRouter()
  const { locale } = router;

  const t = locale === 'en' ? en : pt

  const { userInfo, loggedIn } = React.useContext(UserContext)
  const [info, setUserInfo] = userInfo
  const [logged, setLoggedIn] = loggedIn

  const handleWaitState = () => {
    return waiting ? Styles.waiting : null
  }

  React.useEffect(() => {
    if (logged) {
      router.push('/perfil')
    }

  }, [logged])

  return (
    <main>
      <Frame
        id='login'
        role='main'
        label='Página de Login'
      >
        <Head>
          <title>Login</title>
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
                  label={t.inputEmail}
                  type='email'
                  onInput={setEmail}
                  validation={setError}
                  validator={captureEmail}
                  error={error}
                />
                <p className={Styles.form__desc}>
                  {t.noLoginPlataform} 
                  <a href="mailto:contato@coinlivre.com.br" >{t.clickHere}</a>
                </p>
                <Button
                  id="submit-button"
                  text={t.login}
                  label="Clique e faça login em sua conta CoinLivre"
                  className="w-100 py-2 mt-2 fs-5"
                  hidden={false}
                  onClick={() => { handleUserRequest(setWaiting, setFeedback, setError, email, error) }}
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
                  text={t.emailSent}
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