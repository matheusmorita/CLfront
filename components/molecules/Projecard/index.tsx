import React from 'react'
import Styles from './styles.module.scss'

// formats
import { formatDate, formatDateProjecard } from '@/utils/formatDate';

//dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// languages
import en from '@/public/locales/en/common.json';
import pt from '@/public/locales/pt/common.json';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router';

import logoImage from '@/assets/img/logo.png';
import Link from 'next/link';


type Props = {
  data: Array<any>
  name?: string;
  montante?: string;
  emissor?: string;
  acronimo?: string;
  src?: string;
  valorUnitario?: any;
  date?: string;
  totalValue?: number;
  tokenBalance?: number;
  showTotalValue?: boolean;
  showUnitaryValue?: boolean;
  idProject?: string;
}


const Projecard = ({
  idProject,
  name,
  montante,
  emissor,
  acronimo,
  src,
  valorUnitario,
  date,
  totalValue,
  tokenBalance,
  showTotalValue,
  showUnitaryValue
}: Props) => {
  const [windowWidth, setWindowWidth] = React.useState<number>(0)

  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : pt;

  const { t: translate } = useTranslation('project');

  const convertMontante = (montanteValue: string | undefined) => {
    const montanteValueConverted = Number(montanteValue) / (10 ** 18)
    const montanteToFixed = montanteValueConverted.toFixed(2)

    return parseFloat(montanteToFixed).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
  }

  const toFixedValorUnitario = (unitaryValue: number) => {
    const floatUnitaryValue = unitaryValue.toFixed(2)
    return parseFloat(floatUnitaryValue).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
  }

  const formatBalanceValue = (valorUnitario: number, tokenBalance: number) => {
    const valueResult = (valorUnitario * tokenBalance) / (10 ** 18)
    const valueResultToFixed = valueResult.toFixed(2)
    return parseFloat(valueResultToFixed).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
  }

  const setIdProjectLocalStorage = (idProject: string) => {
    return localStorage.setItem('idProject', idProject)
  }

  React.useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  dayjs.extend(relativeTime)

  return (

    <div className={Styles.projecard}>
      <Link
        onClick={() => setIdProjectLocalStorage(idProject || '')}
        style={
          {
            textDecoration: 'none',
            background: 'red',
            cursor: acronimo ? 'pointer' : 'default',
          }
        }
        href={acronimo ? `/projeto/${name?.replace(/\s/g, '')}` : '#'}
        locale={locale}
      >
        {windowWidth >= 992 ? (
          <div
            style={{
              background: (acronimo === 'CNLT') || acronimo === null ? (
                `linear-gradient(to bottom, transparent, #000), url(${logoImage})`
              ) : `linear-gradient(to right, transparent, #000), url(${src})`,
              position: 'absolute',
              backgroundSize: acronimo ? '' : 'cover',
              width: (acronimo === 'CNLT') ? '15%' : '20%',
              height: '100%',
              left: '0',
              top: '0'
            }}
            id={idProject}
            className={Styles.projecard__picture}
          />
        ) : (
          <div
            style={{
              background: (acronimo === 'CNLT') || acronimo === null ? (
                `linear-gradient(to bottom, transparent, #000), url(${logoImage})` 
              ) : `linear-gradient(to bottom, transparent, #000), url(${src})`,
              position: 'absolute',
              backgroundSize: 'cover',
              width: (acronimo !== 'CNLT') ? '100%' : '25%',
              height: (acronimo !== 'CNLT') ? '100px' : '110px',
              left: (acronimo !== 'CNLT') ? '0' : '40%',
              top: '0'
            }}
            id={idProject}
            className={Styles.projecard__picture}
          />
        )}
      </Link>

      <div className={Styles.projecard__info}>
        <div className={Styles.info}>
          <h1 className={Styles.info__title}>{name ? translate(name) : name}<span>#{acronimo || 'CNLT'}</span></h1>
          {name?.toLowerCase().includes('coinlivre') ? '' : (
            <p className={Styles.info__tiny}>{t.projectOwner} <b>{emissor}</b></p>
          )}

          {/* Progress component */}
          {/* <div className={Styles.progress}>
            <div className={Styles.progress__values}>
              <span>R$ 217.563.232,11</span>
              <span>R$ 302.562.132,18</span>
            </div>
            <div className={Styles.progress__bar} />
          </div> */}
        </div>
      </div>
      <div className={Styles.projecard__data}>
        <div className={Styles.data}>
          <h1 className={Styles.data__title}>
            {t.quantity}
          </h1>
          <span style={{color: Number(montante) < 0 ? 'red' : ''}} className={Styles.data__value}>
            {convertMontante(montante)}<span style={{color: Number(montante) < 0 ? 'red' : ''}}>/unds</span>
          </span>
        </div>
        {showUnitaryValue && (
          valorUnitario && (
            <div className={Styles.data}>
              <h1 className={Styles.data__title}>
                {t.unitaryValue}
              </h1>
              <span className={Styles.data__value}>
                <span>{`R$ ${toFixedValorUnitario(valorUnitario)}` || 'R$ 0,00'}</span>
              </span>
            </div>
          )
        )}

        {tokenBalance && (
          <div className={Styles.data}>
            <h1 className={Styles.data__title}>
              {t.balance}
            </h1>
            <span className={Styles.data__value}>
              <span>{`R$ ${formatBalanceValue(valorUnitario, tokenBalance)}` || 'R$ 0,00'}</span>
            </span>
          </div>
        )}

        {date ? (
          <div className={Styles.data}>
            <h1 className={Styles.data__title}>
              {t.date}
            </h1>
            <span className={Styles.data__value}>
              <span>{formatDateProjecard(date) || '00/00/0000 - 00:00:00'}</span>
            </span>
          </div>
        ) : ''}
        {showTotalValue && (
          totalValue && (
            <div className={Styles.data}>
              <h1 className={Styles.data__title}>
                Total
              </h1>
              <span className={Styles.data__value}>
                <span>R$ {totalValue || '0,00'}</span>
              </span>
            </div>
          )
        )}

      </div>
    </div>
  )
}

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {

  return {
    props: {
      ...(await serverSideTranslations(locale || 'pt-BR', ['project'])),
    },
  }
}

export default Projecard