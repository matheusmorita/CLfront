import Link from 'next/link'
import React from 'react'
import Styles from './styles.module.scss'

import i18next from '@/src/i18n'

type Props = {
  name: string,
  contrast?: boolean
}

const UserOptions = ({ name, contrast = false }: Props) => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [languageBrowser, setLanguageBrowser] = React.useState<string>();

  const handleWhiteTheme = () => {
    return contrast ? Styles.white : undefined
  }

  const handleMenuState = () => {
    return open ? Styles.open : undefined
  }

  const handleMenuToggle = () => {
    setOpen(!open)
  }

  React.useEffect(() => {
    const language = window.navigator.language
    setLanguageBrowser(language)
  }, [])

  return (
    <div
      className={`${Styles.user} ${handleWhiteTheme()}`}
      onClick={() => { handleMenuToggle() }}
    >
      <p className={Styles.user__phrase}>{languageBrowser !== 'pt-BR' ? <>{i18next.t('Olá,')}</> : <>Olá,</>} {name}</p>
      <div className={Styles.user__picture}
        onClick={() => { handleMenuToggle() }}
      />
      <div className={`${Styles.user__menu} ${handleMenuState()}`}>
        <ul className={Styles.user__list}>
          <Link href="/perfil">
            <li className={Styles.user__item}>
              {languageBrowser !== 'pt-BR' ? i18next.t('Perfil') : <>Perfil</>}
            </li>
          </Link>
          <Link href='/logout'>
            <li className={Styles.user__item}>
              {languageBrowser !== 'pt-BR' ? i18next.t('Disconnect') : <>Desconectar</>}
              
            </li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default UserOptions