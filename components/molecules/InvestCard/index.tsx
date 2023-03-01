import React from 'react';
import Styles from './styles.module.scss'
import Button from '@/components/atoms/Button';
import Image from 'next/image';
import ProgressBar from '../ProgressBar';

// import i18next from '@/src/i18n'

// languages
import en from '@/public/locales/en/common.json';
import pt from '@/public/locales/pt/common.json';

import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useTranslation } from 'next-i18next';

interface InvestCardInterface {
  text?: any;
  id: string;
  hidden?: any;
  label?: any;
  onClick?: any;
  src: any;
  alt: string;
  name: string;
  emissor: string;
  acronimo: string;
  hiddenButton: boolean;
  className?: any;
}

function InvestCard({
  text,
  id,
  hidden,
  label,
  onClick,
  src,
  // alt,
  name,
  emissor,
  acronimo,
  hiddenButton,
  className,
}: InvestCardInterface) {
  const router = useRouter();
  const { locale } = router;
  
  const t = locale === 'en' ? en : pt;

  const { t: translate } = useTranslation('project');
  return (
    <div className={Styles.projecard}>
      <div 
        style={{
          background: ` linear-gradient(to right, transparent, #000), url(${src})`,
          backgroundSize: 'cover',
          position: 'absolute',
          width: id !== 'CNLT-0' ? '25%' : '18%',
          height: id !== 'CNLT-0' ? '' : '100%',
          left: id !== 'CNLT-0' ? 0 : 10,
          top: id !== 'CNLT-0' ? 0 : -5,
        }} 
        className={Styles.projecard__picture} />
      <div className={Styles.projecard__info}>
        <div className={Styles.info}>
          <h1 className={Styles.info__title}>{translate(name)}<span>#{acronimo}</span></h1>
          <p className={Styles.info__tiny}>{t.projectOwner} <b>{emissor}</b></p>
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
      {!hiddenButton ? (
        <Button
        hidden={hidden}
        id={id}
        label={label}
        onClick={onClick}
        text={text}
        className={`${className} ${Styles.projecard__button}`}
        disabled={acronimo.includes('CLDG') || acronimo.includes('CLMT')}
      />
      ) : ''}
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

export default InvestCard;