import React from 'react'
import Link from 'next/link'
import Button from '@/atoms/Button'
import Logo from '@/atoms/Logo'
import UserOptions from '@/components/molecules/UserOptions'
import UserContext from '@/context/UserContext'

import { useRouter } from "next/router";
import { getPageTopDistance } from '@/assets/js/util/scroll'
import { getWindowInnerWidth } from '@/assets/js/util/responsive'
import Styles from './styles.module.scss'


type Props = {
  hideLinks: boolean
}

const Header = ({ hideLinks }: Props) => {
  const [whiteTheme, setWhiteTheme] = React.useState<boolean>(false)
  const [responsive, setResponsive] = React.useState<boolean>(false)
  const [languageBrowser, setLanguageBrowser] = React.useState<string>();

  const { userInfo, loggedIn } = React.useContext(UserContext)
  const [info, setUserInfo] = userInfo
  const [logged, setLoggedIn] = loggedIn

  const { locale, locales, push, asPath } = useRouter();

  const handleClick = (l: any) => {
    push('/login/', undefined, {
      locale: l
    })
  }

  React.useEffect(() => {
    const language = window.navigator.language
    setLanguageBrowser(language)

    console.log(window.location.pathname)
    // const beforePath = localStorage.getItem('beforePath')
    // router.push(`${beforePath}`)
  }, [info])


  const handleHeaderChange = () => {
    getPageTopDistance() > 0 ? setWhiteTheme(true) : setWhiteTheme(false)
  }

  const handleWindowChange = () => {
    getWindowInnerWidth() < 992 ? setResponsive(true) : setResponsive(false)
  }

  const handleActiveLink = (path: string) => {
    return router.asPath === path ? Styles.active : Styles.link
  }

  const handleLinkDisabled = (isDisabled: boolean) => {
    return isDisabled ? Styles.disabled : Styles.link
  }

  React.useEffect(() => {
    window.addEventListener("scroll", handleHeaderChange)
    window.addEventListener("resize", handleWindowChange)
    handleWindowChange()
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
        <Logo
          redirect={true}
          white={!whiteTheme}
          responsive={responsive}
        />
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
              text={"Cadastro ou Login"}
              label="Clique e cadastre-se"
              className="ms-3"
              hidden={false}
              disabled={false}
              onClick={() => {
                location.href = "/login"
              }}
            />
          </div>
        )}
        {info && (
          <UserOptions
            name={info.nome}
            contrast={whiteTheme}
          />
        )}
      </div>
      {locales?.map(l => {
        return (
          <Link href={asPath} key={l} locale={l}>{l}</Link>)
      })}
    </nav>
  )
}

export default Header