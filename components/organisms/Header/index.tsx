import React from 'react'
import Link from 'next/link'
import Button from '@/atoms/Button'
import Logo from '@/atoms/Logo'
import Styles from './styles.module.scss'
import UserContext from '@/context/UserContext'

import { useRouter } from "next/router";
import { getPageTopDistance } from '@/assets/js/util/scroll'

type Props = {
  hideLinks: boolean
}

const Header = ({ hideLinks }: Props) => {
  const [whiteTheme, setWhiteTheme] = React.useState<boolean>(false)
  const { userInfo, loggedIn } = React.useContext(UserContext)
  const [info, setUserInfo] = userInfo
  const [logged, setLoggedIn] = loggedIn


  const handleHeaderChange = () => {
    getPageTopDistance() > 0 ? setWhiteTheme(true) : setWhiteTheme(false)
  }

  const handleActiveLink = (path: string) => {
    return router.asPath === path ? Styles.active : Styles.link
  }

  const handleLinkDisabled = (isDisabled: boolean) => {
    return isDisabled ? Styles.disabled : Styles.link
  }

  React.useEffect(() => {
    window.addEventListener("scroll", handleHeaderChange)
  }, [])

  const router = useRouter();
  const routes: Array<Object> = [
    { name: "Início", path: "/", disabled: false },
    { name: "Tokens", path: "/tokens", disabled: true },
    { name: "News", path: "/news", disabled: true },
  ]

  return (
    <nav className={`${Styles.navbar} ${whiteTheme ? Styles.white : ''}`}>
      <div className={`${Styles.navbar__wrapper} container`}>
        <Logo redirect={true} white={!whiteTheme} />
        {!logged && (
          <div className="d-flex align-items-center justify-content-center">
            {
              routes &&
              !hideLinks &&
              routes.map((item: any, index: number) => (
                <Link
                  href={item.path}
                  key={index}
                  className={`${handleActiveLink(item.path)} ${handleLinkDisabled(item.disabled)}`}
                >
                  {item.name}
                </Link>
              ))
            }
            <Button
              id="header-cta"
              text="Cadastro/Login"
              label="Clique e cadastre-se na Lista VIP"
              className="ms-3"
              hidden={false}
              disabled={false}
              onClick={() => {
                location.href = "/login"
              }}
            />
          </div>
        )}
        {logged && (
          <div className={Styles.user}>
            <p className={Styles.user__phrase}>Olá, {info.email}</p>
            <div className={Styles.user__picture}></div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Header