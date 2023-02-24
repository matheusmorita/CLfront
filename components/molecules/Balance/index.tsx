import React from 'react'
import Image from 'next/image'
import EyeOff from '@/assets/img/eye-off.webp'
import Eye from '@/assets/img/eye.webp'
import Styles from './styles.module.scss'

import i18next from '@/src/i18n'

type Props = {
  value?: string,
  type: string
}

const Balance = ({ value = '0', type }: Props) => {
  const [hidden, setHidden] = React.useState<boolean>(true)
  const [languageBrowser, setLanguageBrowser] = React.useState<string>();

  const handleIcon = () => {
    return !hidden ? Eye : EyeOff
  }

  const handleValue = () => {
    return !hidden ? value : '••••••••'
  }

  const handleClass = () => {
    return !hidden ? Styles.shown : undefined
  }

  const handleToggleState = () => {
    setHidden(!hidden)
  }

  React.useEffect(() => {
    const language = window.navigator.language
    setLanguageBrowser(language)
  }, [])

  return (
    <div className={Styles.balance}>
      <h1 className={Styles.balance__title}>
        {languageBrowser !== 'pt-BR' ? i18next.t('Saldo') : 'Saldo'} {type}
      </h1>
      <div className={Styles.balance__value}>
        <span className={handleClass()}>{handleValue()}</span>
        <span
          className='ms-2 cursor-pointer'
          onClick={handleToggleState}
        >
          <Image
            alt={'Ícone de olho'}
            width={15}
            height={undefined}
            src={handleIcon()}
          />
        </span>
      </div>
    </div>
  )
}

export default Balance