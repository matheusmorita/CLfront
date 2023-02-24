import React from 'react'
import Styles from './styles.module.scss'

import i18next from '@/src/i18n';

type Badge = {
  message: string,
  type?: "success" | "warning" | "error"
}

type Props = {
  title?: string,
  value?: string | number,
  badge?: Badge,
  className?: string,
  parcela: number,
  valor: string,
  juros: string,
  vencimento: string,
  project?: any,
}

const QuotaShow = ({
  title,
  value,
  badge,
  className,
  parcela,
  valor,
  juros,
  vencimento,
  project,
}: Props) => {
  const [languageBrowser, setLanguageBrowser] = React.useState<string>();


  React.useEffect(() => {
    const language = window.navigator.language
    setLanguageBrowser(language)
    console.log(project.id)
  }, [])

  return (
    <div
      className={`${Styles.quotashow} ${className}`}
    >
      <div className={Styles.quotashow__content}>
        <div className={Styles.quotashow__data}>
          <h1 className={Styles.quotashow__title}>
          {project.acronimo !== 'CLGT' ? <>{languageBrowser !== 'pt-BR' ?  i18next.t('Parcela') : 'Parcela'}</> : <>{i18next.t('Data')}</>}
          </h1>
          <span className={Styles.quotashow__value}>
            {project.acronimo !== 'CLGT' ? parcela : <>{i18next.t('EM BREVE')}</>}
          </span>
        </div>
        <div className={Styles.quotashow__data}>
          <h1 className={Styles.quotashow__title}>
          {project.acronimo !== 'CLGT' ? <>{languageBrowser !== 'pt-BR' ?  i18next.t('Retorno') : 'Retorno'}</> : <>{i18next.t('Benefício')}</>}
          </h1>
          <span className={Styles.quotashow__value}>
          {project.acronimo !== 'CLGT' ? juros : i18next.t('EM BREVE')}
          </span>
        </div>
        <div className={Styles.quotashow__data}>
          <h1 className={Styles.quotashow__title}>
          {project.acronimo !== 'CLGT' ? <>{languageBrowser !== 'pt-BR' ?  i18next.t('Venc.') : 'Venc.'}</> : <>Status</>}
          </h1>
          <span className={Styles.quotashow__value}>
          {project.acronimo !== 'CLGT' ? vencimento : i18next.t('EM BREVE')}
          </span>
        </div>
      </div>
      {badge && (
        <div
          className={Styles.quotashow__badge}
          data-type={badge.type}
        >
          {badge.message}
        </div>
      )}
    </div>
  )
}

export default QuotaShow