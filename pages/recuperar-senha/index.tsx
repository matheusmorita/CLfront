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
import Check from '@/assets/img/Check.webp'
import Image from 'next/image'

const RecoveryPassword = () => {
  const [step, setStep] = React.useState<number>(1)
  return (
    <Frame
      id='recovery'
      role='main'
      label='Página de Recuperação de senha'
    >
      <Head>
        <title>CoinLivre | Esqueci minha senha</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#00ee8d" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content="CoinLivre | Esqueci minha senha." />
      </Head>

      <Section
        id='recovery'
        label='recovery-title'
        desc='recovery-description'
        justify='center'
        hidden={false}
        className={`${Styles.recovery} pt-5 pt-lg-0 d-flex align-items-center pb-5`}
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
              className='text-center fw-normal my-4'
              text='Recuperar senha'
              size={24}
              height={24}
              hidden={false}
            />
            {
              step === 1 && (
                <div>
                  <p className={Styles.form__desc}>
                    Digite abaixo o endereço de e-mail cadastrado na sua conta, que enviaremos
                    uma mensagem de recuperação de senha. Não compartilhe essa informação com
                    ninguém. Caso ainda não possua uma conta, <Link href="/login">Clique aqui</Link>.
                  </p>
                  <Input
                    id='email'
                    label='Digite seu email'
                    type='email'
                  />
                </div>
              )
            }
            {
              step === 2 && (
                <div>
                  <p className={Styles.form__desc}>
                    Enviamos um e-mail de recuperação. Por favor, clique no link recebido
                    e siga o procedimento para restaurar a sua senha.
                  </p>
                  <Image
                    src={Check}
                    width={60}
                    height={60}
                    className='mb-4'
                    alt='Ícone de confirmação.'
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

export default RecoveryPassword