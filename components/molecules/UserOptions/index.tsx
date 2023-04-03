import Link from 'next/link'
import React from 'react'
import Styles from './styles.module.scss'

// languages
import en from '@/public/locales/en/common.json';
import pt from '@/public/locales/pt/common.json';
import { useRouter } from 'next/router';
import Image from 'next/image';

import defaultImage from '@/assets/img/placeholder.webp'
import { fetchDataUserInfo } from '@/utils/fetchDataAxios';

type Props = {
  name: string,
  contrast?: boolean,
  profileImageSrc: string,
  isAdmin: boolean,
  menuItemIsOpen: boolean,
  setMenuItemIsOpen: any,
  setopenLink: any,
  setOpenOverlay: any
}

const UserOptions = ({
  name,
  contrast = false,
  profileImageSrc,
  isAdmin,
  menuItemIsOpen,
  setMenuItemIsOpen,
  setopenLink,
  setOpenOverlay
}: Props) => {
  const [dataUser, setDataUser] = React.useState<any>();
  const [admin, setAdmin] = React.useState<boolean>(false);
  // const [openMenu, setopenMenu] = React.useState<boolean>(false)

  const router = useRouter();
  const { locale } = router;

  React.useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    fetchDataUserInfo(accessToken, setDataUser, router)
  }, [router])



  const t = locale === 'en' ? en : pt;

  const handleWhiteTheme = () => {
    return contrast ? Styles.white : undefined
  }

  const handleMenuState = () => {
    return menuItemIsOpen ? Styles.open : undefined
  }

  const handleMenuToggle = () => {
    setMenuItemIsOpen(!menuItemIsOpen)
    setopenLink(false)
    setOpenOverlay(true)
    if (menuItemIsOpen) {
      setOpenOverlay(false)
    }
    // if (open) {
    //   return setOpen(false)
    // }
    // return setOpen(true)
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
            <Link href={!admin ? "/admin" : "/notfound"} locale={locale}>
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