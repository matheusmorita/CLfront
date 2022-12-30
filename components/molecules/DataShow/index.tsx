import React from 'react'
import Styles from './styles.module.scss'

type Badge = {
  message: string,
  type?: "success" | "warning" | "error"
}

type Props = {
  title: string,
  value: string | number,
  badge?: Badge,
  highlight?: boolean,
  className?: string,
}

const DataShow = ({ title, value, badge, className, highlight = false }: Props) => {
  return (
    <div
      className={`${Styles.datashow} ${className}`}
      data-highlight={highlight}
    >
      <div className={Styles.datashow__content}>
        <h1 className={Styles.datashow__title}>
          {title}
        </h1>
        <span className={Styles.datashow__value}>
          {value} 
        </span>
      </div>
      {badge && (
        <div 
          className={Styles.datashow__badge}
          data-type={badge.type}
        >
          {badge.message}
        </div>
      )}
    </div>
  )
}

export default DataShow