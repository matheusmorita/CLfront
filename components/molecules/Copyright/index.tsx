import React from 'react'
import Image from 'next/image'
import Styles from './styles.module.scss'
import Blocklize from '@/assets/img/blocklize.webp'
import { useTranslation } from 'react-i18next'
import UserContext from '@/context/UserContext'

const Copyright = () => {
  const [languageBrowser, setLanguageBrowser] = React.useState<string>();

  const { t } = useTranslation();

  const { locale } = React.useContext(UserContext)

  React.useEffect(() => {
    const language = window.navigator.language
    setLanguageBrowser(language)
  // const beforePath = localStorage.getItem('beforePath')
  // router.push(`${beforePath}`)
  })
  return (
    <div className={Styles.copyright}>
      <hr />
      <p className={Styles.copyright__text}>
        {languageBrowser !== 'pt-BR' ? <>CoinLivre&copy; 2022. {t('Todos os direitos reservados.')}</>  : (
          <>CoinLivre&copy; 2022. Todos os direitos reservados.</>
        )}
      </p>
      <p className={Styles.copyright__developer}>
        {languageBrowser !== 'pt-BR' ? <>{t('Desenvolvido por')}&nbsp;</> : (
          <>Desenvolvido por&nbsp;</>
        )}
        
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