import React from 'react'
import Image from 'next/image'
import Styles from './styles.module.scss'
import Blocklize from '@/assets/img/blocklize.webp'
import UserContext from '@/context/UserContext'


// languages
import en from '@/public/locales/en/common.json';
import pt from '@/public/locales/pt/common.json';
import { useRouter } from 'next/router'

const Copyright = () => {

  const router = useRouter();

  const { locale } = router;

  const t = locale === 'en' ? en : pt

  React.useEffect(() => {
  // const beforePath = localStorage.getItem('beforePath')
  // router.push(`${beforePath}`)
  })
  return (
    <div className={Styles.copyright}>
      <hr />
      <p className={Styles.copyright__text}>
        {<>CoinLivre&copy; 2022. {t.reserved}</>}
      </p>
      <p className={Styles.copyright__developer}>
        {<>{t.developedBy}&nbsp;</>}
        
        <a
          href="https://blocklize.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={Blocklize}
            width={100}
            height={undefined}
            alt="Logo da BLocklize"
          />
        </a>
      </p>
    </div>
  )
}

export default Copyright