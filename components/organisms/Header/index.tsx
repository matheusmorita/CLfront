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

import LanguageIcon from '@mui/icons-material/Language';

// languages
import en from '@/public/locales/en/common.json';
import pt from '@/public/locales/pt/common.json';
import { fetchDataUserInfo } from '@/utils/fetchDataAxios'

type Props = {
  hideLinks: boolean
}

const Header = ({ hideLinks }: Props) => {
  const [whiteTheme, setWhiteTheme] = React.useState<boolean>(false)
  const [responsive, setResponsive] = React.useState<boolean>(false)
  const [showLanguages, setShowLanguages] = React.useState<boolean>(false)

  const [balance, setBalance] = React.useState<number>(0);
  const [dataUser, setDataUser] = React.useState<any>();

  const { userInfo, loggedIn } = React.useContext(UserContext)
  const [info, setUserInfo] = userInfo
  const [logged, setLoggedIn] = loggedIn

  const { locale, locales, push, asPath, pathname } = useRouter();

  const t = locale === 'en' ? en : pt

  function handleChangeLanguage(e: any) {
    router.push(`/${pathname}`)
  }

  React.useEffect(() => {
    console.log(window.location.pathname)

    const accessToken = localStorage.getItem('accessToken')

    fetchDataUserInfo(accessToken, setDataUser)
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
      <div className={`${Styles.navbar__wrapper}`}>
        <Logo
          redirect={true}
          white={!whiteTheme}
          responsive={responsive}
        />
        <div style={{ display: 'flex' }}>
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
                text={t.registerOrLogin}
                width='200px'
                label="Clique e cadastre-se"
                className="ms-3"
                hidden={false}
                disabled={false}
                onClick={() => {
                  push('/login')
                }}
              />

            </div>
          )}
          {dataUser?.nome && (
            <UserOptions
              name={dataUser.nome}
              contrast={whiteTheme}
            />
          )}
          <section className={Styles.sectionLanguage}>
            <div className={Styles.linksDiv}>
              {showLanguages && (
                locales?.map(l => {
                  return (
                    <div key={l}>
                      <Link
                        className={Styles.linkLanguageStyle}
                        href={asPath}
                        key={l}
                        locale={l}
                      >
                        <b style={{ color: '#00EE8D' }}>
                          {l.toLocaleUpperCase()}
                        </b>
                      </Link>
                    </div>
                  )
                })
              )}
            </div>
            <button className={Styles.buttonIcon} onClick={() => setShowLanguages(!showLanguages)}>
              <LanguageIcon width={250} height={250} className={Styles.languageIcon} />
            </button>
          </section>
        </div>
      </div>

    </nav>
  )
}

export default Header