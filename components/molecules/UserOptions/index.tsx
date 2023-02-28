import Link from 'next/link'
import React from 'react'
import Styles from './styles.module.scss'

import i18next from '@/src/i18n'

// languages
import en from '@/public/locales/en/common.json';
import pt from '@/public/locales/pt/common.json';
import { useRouter } from 'next/router';

type Props = {
  name: string,
  contrast?: boolean
}

const UserOptions = ({ name, contrast = false }: Props) => {
  const [open, setOpen] = React.useState<boolean>(false)

  const router = useRouter();

  const { locale } = router;

  const t = locale === 'en' ? en : pt;

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
      <p className={Styles.user__phrase}>{t.hello} {name}</p>
      <div className={Styles.user__picture}
        onClick={() => { handleMenuToggle() }}
      />
      <div className={`${Styles.user__menu} ${handleMenuState()}`}>
        <ul className={Styles.user__list}>
          <Link href="/perfil">
            <li className={Styles.user__item}>
              {t.profile}
            </li>
          </Link>
          <Link href='/logout'>
            <li className={Styles.user__item}>
              {t.disconnect}
              
            </li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default UserOptions