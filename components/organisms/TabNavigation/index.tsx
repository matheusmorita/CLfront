import Link from 'next/link'
import React from 'react'
import Styles from './styles.module.scss'
import { useRouter } from "next/router"

import i18next from '@/src/i18n'

type Link = {
  name: string,
  path: string,
}

type Props = {
  links: Array<Link>
  languageBrowser?: string
}

const TabNavigation = ({ links, languageBrowser }: Props) => {
  const router = useRouter();
  const handleActiveLink = (path: string) => {
    return router.asPath.includes(path) ? Styles.active : ""
  }

  return (
    <div className={Styles.tabnavigation}>
      {
        links &&
        links.map((link: any, index: number) => (
          <Link
            key={index}
            href={`#${link.path}`}
            className={`${Styles.tabnavigation__link} ${handleActiveLink(link.path)}`}
          >
            <span className='d-inline-block'>
              {languageBrowser === "en-US" ? i18next.t(link.name) : link.name}
            </span>
          </Link>
        ))
      }
    </div>
  )
}

export default TabNavigation