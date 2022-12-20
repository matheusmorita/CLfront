import Image from 'next/image';
import React from 'react'
import Button from '../../atoms/Button';
import Paragraph from '../../atoms/Paragraph';
import Title from '../../atoms/Title';
import Form from '../../molecules/Form'
import Styles from './styles.module.scss'
import Check from '../../../assets/img/Check.webp'

const WaitingList = () => {
  const [name, setName] = React.useState(null)
  const [email, setEmail] = React.useState(null)
  const [mktPolicy, setMktPolicy] = React.useState(false)
  const [dataPolicy, setDataPolicy] = React.useState(false)
  const [feedback, setFeedback] = React.useState("Sucesso!")

  const [finish, setFinish] = React.useState(false)
  const [waiting, setWaiting] = React.useState(false)
  const [validation, setValidation] = React.useState(false)
  const [isNameValid, setIsNameValid] = React.useState<any>([])
  const [isEmailValid, setIsEmailValid] = React.useState<any>([])


  const sendData = async (email: string | undefined | null) => {
    var data = JSON.stringify({
      "name": name,
      "email": email
    });

    var config = {
      method: 'post',
      headers: {
        'X-Parse-Application-Id': 'dR30zBB72X8Hsrquh4DgPWRnJe8Nhd8N8AcQpXVU',
        'X-Parse-REST-API-Key': 'wFa33ak4LMUXxJpFtQbt1qtRaF4ALicVHSzjKFGi',
        'Content-Type': 'application/json'
      },
      body: data
    }

    if (email) {
      setWaiting(true)
      await fetch('https://parseapi.back4app.com/functions/waiting-list', config)
        .then(resp => resp.json())
        .then(json => {
          if (json.result) {
            setFeedback(json.result)
            setFinish(true)
          }
        })
        .catch(error => {
          setWaiting(false)
          setIsNameValid(false)
          setIsEmailValid(false)
          throw error
        })
    } else {
      console.log("E-mail inválido")
    }
  }

  const captureEmail = (e: any) => {
    const email = e.target.value
    const regexp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (regexp.test(email)) {
      setEmail(email)
      setIsEmailValid(true)
    } else {
      setEmail(null)
      setIsEmailValid(false)
    }
  }

  const captureName = (e: any) => {
    const name = e.target.value
    if (name.length > 6) {
      setName(name)
      setIsNameValid(true)
    } else {
      setName(null)
      setIsNameValid(false)
    }
  }

  React.useEffect(() => {
    if (name && email && dataPolicy && mktPolicy) {
      setValidation(true)
    } else {
      setValidation(false)
    }
  }, [name, email, dataPolicy, mktPolicy])

  return (
    <Form
      id='waiting-list'
      onSubmit={() => { }}
      label="Formulário de Waiting List"
    >
      <Title
        id='waiting-list-title'
        className='text-center fw-normal'
        text='Waiting List'
        size={24}
        hidden={false}
      />
      {!finish && (
        <div
          aria-disabled={waiting}
          className={Styles.form}
        >
          <div
            className={Styles.group}
            data-error={!isNameValid}
          >
            <input
              id='name'
              name='name'
              type="text"
              disabled={waiting}
              className={Styles.input}
              onInput={captureName}
              placeholder=' '
              minLength={6}
              required
            />
            <label
              htmlFor="name"
              aria-label='Campo para digitar seu nome'
              className={Styles.label}
            >
              Digite seu nome
            </label>
          </div>
          <div
            className={Styles.group}
            data-error={!isEmailValid}
          >
            <input
              id='email'
              name='email'
              type="email"
              disabled={waiting}
              className={Styles.input}
              onInput={captureEmail}
              placeholder=' '
              required
            />
            <label
              htmlFor="email"
              aria-label='Campo para digitar seu e-mail'
              className={Styles.label}
            >
              Digite seu E-mail
            </label>
          </div>
          <div className="form-check my-3">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={() => setDataPolicy(!dataPolicy)}
              id="flexCheckDefault"
              disabled={waiting}
            />
            <label
              className="form-check-label"
              htmlFor="flexCheckDefault"
            >
              Eu li e concordo com os termos de uso de dados, política de
              privacidade e cookies
            </label>
          </div>
          <div className="form-check my-3">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={() => setMktPolicy(!mktPolicy)}
              id="flexCheckDefaultTwo"
              disabled={waiting}
            />
            <label
              className="form-check-label"
              htmlFor="flexCheckDefaultTwo"
            >
              Eu aceito receber e-mails comerciais de novas campanhas,
              promoções e outras novidades.
            </label>
          </div>
          <Button
            id="submit-button"
            text="Cadastre-se"
            label="Clique e cadastre-se na Waiting List"
            className="w-100 py-2 fs-5"
            hidden={false}
            disabled={!validation || waiting}
            onClick={() => sendData(email)}
          />
        </div>
      )}

      {finish && (
        <div className={Styles.finish}>
          <Paragraph
            id='thank-you-desc'
            color='#D1D1D1'
            text={feedback}
            size={16}
          />
          <Image
            src={Check}
            width={60}
            height={60}
            className='mb-4'
            alt='Ícone de confirmação.'
          />
          <Button
            id="submit-button"
            text="Finalizar"
            label="Clique para voltar"
            className="w-100 py-2 fs-5"
            hidden={false}
            onClick={() => setFinish(false)}
          />
        </div>
      )}
    </Form>
  )
}

export default WaitingList