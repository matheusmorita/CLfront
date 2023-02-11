import Link from 'next/link'
import React from 'react'
import Styles from './styles.module.scss'

type Props = {
  email: string,
  contrast?: boolean
}

const UserOptions = ({ email, contrast = false }: Props) => {
  const [open, setOpen] = React.useState<boolean>(false)

  const handleWhiteTheme = () => {
    return contrast ? Styles.white : undefined
  }

  const handleMenuState = () => {
    return open ? Styles.open : undefined
  }

  const handleMenuToggle = () => {
    setOpen(!open)
  }

  return (
    <div
      className={`${Styles.user} ${handleWhiteTheme()}`}
      onClick={() => { handleMenuToggle() }}
    >
      <p className={Styles.user__phrase}>Olá, {email}</p>
      <div className={Styles.user__picture}
        onClick={() => { handleMenuToggle() }}
      />
      <div className={`${Styles.user__menu} ${handleMenuState()}`}>
        <ul className={Styles.user__list}>
          <Link href="/perfil">
            <li className={Styles.user__item}>
              Perfil
            </li>
          </Link>
          <Link href='/logout'>
            <li className={Styles.user__item}>
              Desconectar
            </li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default UserOptions