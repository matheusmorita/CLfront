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
import Link from 'next/link'

const Login = () => {
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
          <Form
            id='form'
            onSubmit={() => { }}
            label="Formulário de Lista VIP"
            className={Styles.form}
          >
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
            />
            <Input
              id='password'
              label='Digite sua senha'
              type='password'
            />
            <p className={Styles.form__desc}>
              Esqueceu sua senha? <a href="">Clique aqui</a>
              <br />
              Ainda não tem uma conta? <Link href="/registrar">Cadastre-se</Link>
            </p>
            <Button
              id="submit-button"
              text="Entrar"
              label="Clique e faça login em sua conta CoinLivre"
              className="w-100 py-2 mt-2 fs-5"
              hidden={false}
              onClick={() => { }}
            />
          </Form>
        </Column>
      </Section>

    </Frame>
  )
}

export default Login