import React from 'react'
import Link from 'next/link'
import Button from '../../atoms/Button'
import Logo from '../../atoms/Logo'
import Styles from './styles.module.scss'

import { useRouter } from "next/router";
import { getPageTopDistance } from '../../../assets/js/scrollUtil'

type Props = {
  hideLinks: boolean
}

const Header = ({ hideLinks }: Props) => {
  const [whiteTheme, setWhiteTheme] = React.useState<boolean>(false)

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
    { name: "Sobre", path: "/quem-somos", disabled: false },
    { name: "Projetos", path: "/projeto/named", disabled: false },
    { name: "Tokens", path: "/tokens", disabled: true },
    { name: "News", path: "/news", disabled: true },
  ]

  return (
    <nav className={`${Styles.navbar} ${whiteTheme ? Styles.white : ''}`}>
      <div className={`${Styles.navbar__wrapper} container`}>
        <Link href="/">
          <Logo white={!whiteTheme} />
        </Link>
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