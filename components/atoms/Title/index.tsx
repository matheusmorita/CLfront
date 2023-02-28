import React from 'react'
import Styles from './styles.module.scss'

import {useTranslation} from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

type Props = {
  id?: string,
  text?: string | any,
  className?: string,
  hidden?: boolean,
  size?: number,
  width?: number,
  height?: number,
  color?: string,
  weight?: string | number,
}

const Title = ({ id, className, text, hidden, width, color, size, height, weight }: Props) => {
  const { t } = useTranslation('common')
  return (
    <h1
      id={id}
      aria-hidden={hidden}
      className={`${Styles.title} ${className}`}
      style={{
        maxWidth: `${width}ch`,
        color: color,
        fontSize: `${size}px`,
        fontWeight: weight,
        lineHeight: `${height}px`
      }}
    >
      {t(text)}
    </h1>
  )
}

export async function getServerSideProps({
  locale,
  }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
  
  return {
      props: {
          ...(await serverSideTranslations(locale || 'pt-BR', ['common', 'login', 'footer'])),
      },
    }
  }

export default Title