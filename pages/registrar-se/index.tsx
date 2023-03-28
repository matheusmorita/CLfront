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

import InputMask from 'react-input-mask'

import { handleGetUserInfo, handleUserRequestRegister } from '@/utils/fetchDataAxios'

// languages
import en from '@/public/locales/en/common.json';
import pt from '@/public/locales/pt/common.json';

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

  const [valueCpf, setValueCpf] = React.useState<string>('')
  const [valueBirth, setValueBirth] = React.useState<any>('')

  const [checked, setChecked] = React.useState<boolean>(false)

  const { locale } = router;

  const t = locale === 'en' ? en : pt

  // const handleUserRequest = async () => {
  //   if (validation) {
  //     setWaiting(true)
  //     const token = localStorage.getItem('accessToken')
  //     if (token && name && cpf && date) {
  //       const data = JSON.stringify({
  //         "nome": name,
  //         "cpf": cpf,
  //         "dataNascimento": date
  //       })

  //       const config = {
  //         method: 'post',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Access-Control-Allow-Origin': '*',
  //           "Authorization": 'Bearer ' + token,
  //         },
  //         body: data
  //       }

  //       await fetch('https://coinlivre.blocklize.io/usuario/cadastrarUser', config)
  //         .then(resp => {
  //           if (resp.ok) {
  //             setWaiting(false)
  //             setSuccess(true)
  //             setTimeout(() => {
  //               router.push('/perfil')
  //             }, 3000);
  //           }
  //         })
  //     }
  //   }
  // }

  // const handleGetUserInfo = async () => {
  //   const token = localStorage.getItem('accessToken')

  //   const config = {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //       "Authorization": 'Bearer ' + token,
  //     }
  //   }

  //   await fetch('https://coinlivre.blocklize.io/usuario/getUserCadastro', config)
  //     .then(resp => {
  //       if (resp.ok) {
  //         setSuccess(true)
  //         setPreloaded(true)
  //         setTimeout(() => {
  //           router.push('/')
  //         }, 3000);
  //       } else {
  //         setPreloaded(true)
  //       }
  //     })
  // }

  const handleWaitState = () => {
    return waiting ? Styles.waiting : null
  }

  React.useEffect(() => {
    if (logged) {
      handleGetUserInfo(setSuccess, setPreloaded, router)
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
            <title>Registrar</title>
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
                  text={t.register}
                  size={24}
                  hidden={false}
                />
                {!success && (
                  <>
                    <Input
                      id='name'
                      label={t.insertFullName}
                      type='name'
                      onInput={setName}
                      validation={setErrorName}
                      validator={captureName}
                      error={errorName}
                    />
                    <Input
                      id='birth'
                      label={t.birthday}
                      type='date'
                      onInput={setDate}
                      validation={setErrorDate}
                      error={errorDate}
                      required={true}
                      onChange={(e: any) => setValueBirth(e.target.value)}
                    />
                    <Input
                      id='cpf'
                      label={t.insertCpf}
                      type='text'
                      onInput={setCpf}
                      validation={setErrorCPF}
                      error={errorCPF}
                      required={true}
                      onChange={(e: any) => setValueCpf(e.target.value)}
                    />
                    <Checkbox
                      onClick={() => setChecked(!checked)}
                    />
                    <Button
                      id="submit-button"
                      text={t.next}
                      label="Clique continue para seu cadastro"
                      className="w-100 py-2 mt-3 fs-5"
                      disabled={!validation || !checked || ((valueCpf === '') || (valueCpf.length < 14)) || (valueBirth === '')}
                      hidden={false}
                      onClick={() => { handleUserRequestRegister(setWaiting, setSuccess, name, cpf, date, validation, router) }}
                    />
                  </>
                )}
                {success && (
                  <>
                    <Paragrah
                      id='form-description'
                      text={t.confirmedRegisterRedirect}
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
            <title>Registrar</title>
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