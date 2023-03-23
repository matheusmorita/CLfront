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

import Language from '../Language'

import LanguageIcon from '@mui/icons-material/Language';

// languages
import en from '@/public/locales/en/common.json';
import pt from '@/public/locales/pt/common.json';

import { fetchDataUserInfo } from '@/utils/fetchDataAxios'
import DivisionBar from '@/components/atoms/Division'
import HamburgerMenu from '../HamburgerMenu'
import Overlay from '@/components/molecules/Overlay'

type Props = {
  hideLinks?: boolean
}

const Header = ({ hideLinks }: Props) => {
  const [whiteTheme, setWhiteTheme] = React.useState<boolean>(false)
  const [responsive, setResponsive] = React.useState<boolean>(false)
  const [showLanguages, setShowLanguages] = React.useState<boolean>(false)
  const [windowWidth, setWindowWidth] = React.useState<number>(0)

  const [isOpen, setIsOpen] = React.useState(false);

  const [selectedLanguage, setSelectedLanguage] = React.useState('en');

  const [dataUser, setDataUser] = React.useState<any>();

  const { userInfo, loggedIn } = React.useContext(UserContext)
  const [info, setUserInfo] = userInfo
  const [logged, setLoggedIn] = loggedIn

  const { locale, locales, push, asPath, pathname } = useRouter();

  const t = locale === 'en' ? en : pt

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

  const handleLanguageChange = (e: any) => {
    const lang = e.target.value;
    router.push(router.pathname, router.asPath, { locale: lang });
    setSelectedLanguage(e.target.value);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleHeaderChange)
    window.addEventListener("resize", handleWindowChange)
    handleWindowChange()

    setWindowWidth(window.innerWidth)

  }, [])

  const router = useRouter();
  const routes: Array<Object> = [
    { name: "Início", path: "/", disabled: false },
    { name: "Tokens", path: "/tokens", disabled: true },
    { name: "News", path: "/news", disabled: true },
  ]

  return (
    <nav className={`${Styles.navbar} ${whiteTheme ? Styles.white : ''}`}>
      {/* <Overlay /> */}
      <div className={`${Styles.navbar__wrapper}`}>
        <Logo
          redirect={true}
          white={!whiteTheme}
          responsive={responsive}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: logged ? '10%' : '' }}>
          {dataUser?.nome && (
            <UserOptions
              name={dataUser.nome}
              contrast={whiteTheme}
              profileImageSrc={dataUser?.imgPerfilUrl}
              isAdmin={dataUser.isAdmin}
            />
          )}
          {!logged && (
            <div className="d-flex align-items-center justify-content-center">
              <Button
                margin={windowWidth <= 992 ? '0' : '0 5%'}
                width={windowWidth <= 992 ? '200px' : '220px'}
                id="header-cta"
                text={t.registerOrLogin}
                label="Clique e cadastre-se"
                // margin='3%'
                className={`ms-3 ${windowWidth <= 992 ? 'me-3' : 'me-5'}`}
                hidden={false}
                disabled={false}
                onClick={() => {
                  push('/login')
                }}
              />
            </div>
          )}
          <div className={Styles.menuLanguageStyle}>
            <HamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            <Language />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header