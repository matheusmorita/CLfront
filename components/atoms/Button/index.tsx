import React from 'react'
import Styles from './styles.module.scss'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next'

type Props = {
  id: string,
  label: string,
  hidden: boolean,
  text: string,
  onClick: any,
  disabled?: boolean,
  className?: string,
  size?: number;
  type?: any;
}

const Button = ({ id, label, hidden, disabled, text, onClick, className, size, type }: Props) => {
  const { t } = useTranslation('login');

  return (
    <button
      id={id}
      aria-label={label}
      aria-hidden={hidden}
      disabled={disabled}
      onClick={onClick}
      className={`${Styles.button} ${className}`}
      style={{fontSize: size}}
      type={type}
    >
      {t(text)}
    </button>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
      props: {
          ...(await serverSideTranslations(locale, ['login']))
      }
  }
}

export default Button