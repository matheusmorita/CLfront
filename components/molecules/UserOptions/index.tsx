import Link from 'next/link'
import React from 'react'
import Styles from './styles.module.scss'

// languages
import en from '@/public/locales/en/common.json';
import pt from '@/public/locales/pt/common.json';
import { useRouter } from 'next/router';
import Image from 'next/image';

import defaultImage from '@/assets/img/placeholder.webp'

type Props = {
  name: string,
  contrast?: boolean,
  profileImageSrc: string,
  isAdmin: boolean,
}

const UserOptions = ({ name, contrast = false, profileImageSrc, isAdmin }: Props) => {
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
      <p className={Styles.user__phrase}>{t.hello} {name.split(' ')[0]}</p>
      <Image
        alt='Profile Picture'
        src={profileImageSrc ? profileImageSrc : defaultImage}
        width={40}
        height={40}
        className={Styles.user__picture}
        onClick={() => { handleMenuToggle() }}
      />
      <div className={`${Styles.user__menu} ${handleMenuState()}`}>
        <ul className={Styles.user__list}>
          <Link href="/perfil" locale={locale}>
            <li className={Styles.user__item}>
              {t.profile}
            </li>
          </Link>
          {!isAdmin && (
            <Link href="/admin" locale={locale}>
              <li className={Styles.user__item}>
                Controle Admin
              </li>
            </Link>
          )}

          <Link href='/logout' locale={locale}>
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