import React from 'react'
import Image from 'next/image'
import Styles from './styles.module.scss'
import Blocklize from '@/assets/img/blocklize.webp'
import { useTranslation } from 'react-i18next'
import UserContext from '@/context/UserContext'

const Copyright = () => {
  const { t } = useTranslation();

  const { locale } = React.useContext(UserContext)
  return (
    <div className={Styles.copyright}>
      <hr />
      <p className={Styles.copyright__text}>
        {locale === 'en-US' ? t('CoinLivre&copy; 2022. Todos os direitos reservados.') : (
          <>CoinLivre&copy; 2022. Todos os direitos reservados.</>
        )}
      </p>
      <p className={Styles.copyright__developer}>
        {locale === 'en-US' ? <>{t('Desenvolvido por')}&nbsp;</> : (
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