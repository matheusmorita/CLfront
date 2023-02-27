import { margin } from '@mui/system';
import i18next from '@/src/i18n';
import React from 'react'
import Styles from './styles.module.scss'
import dayjs from 'dayjs';


type Props = {
  data: Array<any>
  name?: string;
  montante?: string;
  emissor?: string;
  acronimo?: string;
  src?: string;
  valorUnitario?: string;
  date?: string;
  totalValue?: number;
}


const Projecard = ({ data, name, montante, emissor, acronimo, src, valorUnitario, date, totalValue }: Props) => {
  const [windowWidth, setWindowWidth] = React.useState<number>(0)
  const [languageBrowser, setLanguageBrowser] = React.useState<string>();

  const convertMontante = (montanteValue: string | undefined) => {
    const montanteValueConverted = Number(montanteValue) / (10 ** 18)

    return montanteValueConverted.toString()
  }

  const formatDate = (date: any) => {
    const formated = dayjs(date, 'YYYY-MM-DDTHH:MM:ss').format('DD/MM/YYYY')
    return formated
  }

  React.useEffect(() => {
    setWindowWidth(window.innerWidth)
    const language = window.navigator.language
    setLanguageBrowser(language)
  }, [])

  return (
    <div className={Styles.projecard}>
      {windowWidth >= 992 ? (
        <div
          style={{
            background: acronimo ? (
              `linear-gradient(to right, transparent, #000), url(${src})`
            ) : '',
            position: 'absolute',
            backgroundSize: acronimo ? '' : 'cover',
            width: acronimo ? '20%' : '15%',
            height: '100%',
            left: '0',
            top: '0'
          }}
          className={Styles.projecard__picture}
        />
      ) : (
        <div
          style={{
            background: acronimo ? (
              `linear-gradient(to bottom, transparent, #000), url(${src})`
            ) : '',
            position: 'absolute',
            backgroundSize: 'cover',
            width: acronimo ? '100%' : '25%',
            height: acronimo ? '100px' : '110px',
            left: acronimo ? '0' : '40%',
            top: '0'
          }}
          className={Styles.projecard__picture}
        />
      )}

      <div className={Styles.projecard__info}>
        <div className={Styles.info}>
          <h1 className={Styles.info__title}>{name}<span>#{acronimo || 'CNLT'}</span></h1>
          {name?.toLowerCase().includes('coinlivre') ? '' : (
            <p className={Styles.info__tiny}>{languageBrowser !== 'pt-BR' ? i18next.t('Emitido por') : 'Emitido por'} <b>{emissor}</b></p>
          )}

          {/* Progress component */}
          <div className={Styles.progress}>
            <div className={Styles.progress__values}>
              <span>R$ 217.563.232,11</span>
              <span>R$ 302.562.132,18</span>
            </div>
            <div className={Styles.progress__bar} />
          </div>
        </div>
      </div>
      <div className={Styles.projecard__data}>
        <div className={Styles.data}>
          <h1 className={Styles.data__title}>
            {languageBrowser !== 'pt-BR' ? i18next.t('Quantidade') : 'Quantidade'}
          </h1>
          <span className={Styles.data__value}>
            {convertMontante(montante)}<span>/unds</span>
          </span>
        </div>
        {valorUnitario ? (
          <div className={Styles.data}>
            <h1 className={Styles.data__title}>
              {languageBrowser !== 'pt-BR' ? i18next.t('Valor unitário') : 'Valor unitário'}
            </h1>
            <span className={Styles.data__value}>
              <span>{`R$ ${valorUnitario}` || 'R$ 0'}</span>
            </span>
          </div>
        ) : ''}
        {date ? (
          <div className={Styles.data}>
            <h1 className={Styles.data__title}>
              {languageBrowser !== 'pt-BR' ? i18next.t('Data') : 'Data'}
            </h1>
            <span className={Styles.data__value}>
              <span>{formatDate(date) || '00/00/0000'}</span>
            </span>
          </div>
        ) : ''}
        {totalValue && (
          <div className={Styles.data}>
            <h1 className={Styles.data__title}>
              Total
            </h1>
            <span className={Styles.data__value}>
              <span>R$ {totalValue}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Projecard