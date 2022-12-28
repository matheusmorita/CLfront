import React from 'react'
import Link from 'next/link'
import Button from '../../atoms/Button'
import Logo from '../../atoms/Logo'
import Styles from './styles.module.scss'

import { getPageTopDistance } from '../../../assets/js/scrollUtil'

const Header = () => {
  const [whiteTheme, setWhiteTheme] = React.useState<boolean>(false)

  const handleHeaderChange = () => {
    getPageTopDistance() > 0 ? setWhiteTheme(true) : setWhiteTheme(false)
  }

  React.useEffect(() => {
    window.addEventListener("scroll", handleHeaderChange)
  }, [])

  return (
    <nav className={`${Styles.navbar} ${whiteTheme ? Styles.white : ''}`}>
      <div className={`${Styles.navbar__wrapper} container`}>
        <Link href="/">
          <Logo white={!whiteTheme} />
        </Link>
        <div className="d-flex align-items-center justify-content-center">
          <a href="#" className={Styles.active}>
            Sobre
          </a>
          <span className={Styles.disabled}>
            Tokens
          </span>
          <span className={Styles.disabled}>
            News
          </span>
          <Button
            id="header-cta"
            text="Lista VIP"
            label="Clique e cadastre-se na Lista VIP"
            className="ms-3"
            hidden={false}
            disabled={false}
            onClick={() => {
              window.scrollTo(0, 0)
            }}
          />
        </div>
      </div>
    </nav>
  )
}

export default Header