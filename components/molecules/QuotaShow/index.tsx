import React from 'react'
import Styles from './styles.module.scss'

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
  vencimento: string
}

const QuotaShow = ({
  title,
  value,
  badge,
  className,
  parcela,
  valor,
  juros,
  vencimento
}: Props) => {
  return (
    <div
      className={`${Styles.quotashow} ${className}`}
    >
      <div className={Styles.quotashow__content}>
        <div className={Styles.quotashow__data}>
          <h1 className={Styles.quotashow__title}>
            Parcela
          </h1>
          <span className={Styles.quotashow__value}>
            {parcela}
          </span>
        </div>
        {/* <div className={Styles.quotashow__data}>
          <h1 className={Styles.quotashow__title}>
            Valor
          </h1>
          <span className={Styles.quotashow__value}>
            {valor}
          </span>
        </div> */}
        <div className={Styles.quotashow__data}>
          <h1 className={Styles.quotashow__title}>
            Juros
          </h1>
          <span className={Styles.quotashow__value}>
            {juros}
          </span>
        </div>
        <div className={Styles.quotashow__data}>
          <h1 className={Styles.quotashow__title}>
            Venc.
          </h1>
          <span className={Styles.quotashow__value}>
            {vencimento}
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