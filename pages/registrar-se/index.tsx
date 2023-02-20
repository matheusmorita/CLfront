/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Styles from './styles.module.scss'
import Frame from '@/templates/Frame'
import Head from 'next/head'
import Section from '@/components/organisms/Section'
import Column from '@/components/molecules/Column'
import Title from '@/components/atoms/Title'
import Paragrah from '@/components/atoms/Paragraph'
import Form from '@/components/molecules/Form'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import UserContext from '@/context/UserContext'
import Checkbox from '@/components/atoms/Checkbox'
import Check from '@/assets/img/Check.webp'
import Loader from '@/components/atoms/Loader'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { captureName } from '@/assets/js/util/validations'

const Register = () => {
  const router = useRouter()
  const { userInfo, loggedIn } = React.useContext(UserContext)
  const [info, setUserInfo] = userInfo
  const [logged, setLoggedIn] = loggedIn

  const [name, setName] = React.useState()
  const [date, setDate] = React.useState()
  const [cpf, setCpf] = React.useState()

  const [waiting, setWaiting] = React.useState<boolean>(false)
  const [success, setSuccess] = React.useState<boolean>(false)

  const [validation, setValidation] = React.useState<boolean>()
  const [preloaded, setPreloaded] = React.useState<boolean>(false)

  const [errorName, setErrorName] = React.useState()
  const [errorCPF, setErrorCPF] = React.useState()
  const [errorDate, setErrorDate] = React.useState()

  const [checked, setChecked] = React.useState<boolean>(false)

  const handleUserRequest = async () => {
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

        await fetch('https://coinlivre.blocklize.io/usuario/cadastrarUser', config)
          .then(resp => {
            if (resp.ok) {
              setWaiting(false)
              setSuccess(true)
              setTimeout(() => {
                router.push('/')
              }, 3000);
            }
          })
      }
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

  const handleWaitState = () => {
    return waiting ? Styles.waiting : null
  }

  React.useEffect(() => {
    if (logged) {
      handleGetUserInfo()
    }
  }, [logged])

  React.useEffect(() => {
    if (errorName || errorDate || errorCPF) {
      setValidation(false)
    } else {
      setValidation(true)
    }
  }, [name, date, cpf])

  if (preloaded) {
    return (
      <main>
        <Frame
          id='register'
          role='main'
          label='Página de Registro'
        >
          <Head>
            <title>CoinLivre | Registrar</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="theme-color" content="#00ee8d" />
            <meta name="robots" content="index, follow" />
            <meta name="description" content="CoinLivre | Registrar." />
          </Head>

          <Section
            id='register'
            label='register-title'
            desc='register-description'
            justify='center'
            hidden={false}
            className={`${Styles.register} pt-5 pt-lg-0 d-flex align-items-center pb-5`}
          >
            <Column
              size={4}
              media={'lg'}
              className='text-center'
            >
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
                  text='Registrar-se'
                  size={24}
                  hidden={false}
                />
                {!success && (
                  <>
                    <Input
                      id='name'
                      label='Digite seu nome completo'
                      type='name'
                      onInput={setName}
                      validation={setErrorName}
                      validator={captureName}
                      error={errorName}
                    />
                    <Input
                      id='birth'
                      label='Data de nascimento'
                      type='date'
                      onInput={setDate}
                      validation={setErrorDate}
                      error={errorDate}
                    />
                    <Input
                      id='cpf'
                      label='Digite seu CPF'
                      type='text'
                      onInput={setCpf}
                      validation={setErrorCPF}
                      error={errorCPF}
                    />
                    <Checkbox
                      onClick={() => setChecked(!checked)}
                    />
                    <Button
                      id="submit-button"
                      text="Continuar"
                      label="Clique continue para seu cadastro"
                      className="w-100 py-2 mt-3 fs-5"
                      disabled={!validation || !checked}
                      hidden={false}
                      onClick={() => { handleUserRequest() }}
                    />
                  </>
                )}
                {success && (
                  <>
                    <Paragrah
                      id='form-description'
                      text={'Cadastro realizado com sucesso! Aguarde, você será redirecionado.'}
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
                  </>
                )}
              </Form>
            </Column>
          </Section>
        </Frame>
      </main>
    )
  } else {
    return (
      <main>
        <Frame
          id='register'
          role='main'
          label='Página de Registro'
        >
          <Head>
            <title>CoinLivre | Registrar</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="theme-color" content="#00ee8d" />
            <meta name="robots" content="index, follow" />
            <meta name="description" content="CoinLivre | Registrar." />
          </Head>
          <Section
            id='register'
            label='register-title'
            desc='register-description'
            justify='center'
            hidden={false}
            className={`${Styles.register} vh-100`}
          >
            <Loader
              active={true}
              absolute={true}
            />
          </Section>
        </Frame>
      </main>
    )
  }
}

export default Register