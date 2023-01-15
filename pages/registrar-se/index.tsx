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
import Link from 'next/link'

const Register = () => {
  const [step, setStep] = React.useState<number>(1)
  return (
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
            className={Styles.form}
          >
            <Title
              id='form-title'
              className='text-center fw-normal'
              text='Registrar-se'
              size={24}
              hidden={false}
            />
            {
              step === 1 && (
                <div>
                  <Input
                    id='name'
                    label='Digite seu nome completo'
                    type='name'
                  />
                  <Input
                    id='email'
                    label='Digite seu email'
                    type='email'
                  />
                  <p className={Styles.form__desc}>
                    Já possui uma conta? <Link href="/login">Clique aqui</Link>
                  </p>
                </div>
              )
            }
            {
              step === 2 && (
                <div>
                  <Input
                    id='cpf'
                    label='Digite seu CPF'
                    type='text'
                  />
                  <Input
                    id='birth'
                    label='Data de nascimento'
                    type='date'
                  />
                  <Input
                    id='password'
                    label='Digite sua senha'
                    type='password'
                  />
                  <Input
                    id='passwordConfirm'
                    label='Confirme a senha digitada'
                    type='password'
                  />
                </div>
              )
            }
            <Button
              id="submit-button"
              text="Continuar"
              label="Clique continue para seu cadastro"
              className="w-100 py-2 mt-3 fs-5"
              hidden={false}
              onClick={() => { setStep(2) }}
            />
          </Form>
        </Column>
      </Section>
    </Frame>
  )
}

export default Register