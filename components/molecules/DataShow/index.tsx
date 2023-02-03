import React from 'react'
import Styles from './styles.module.scss'

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from 'next/link';

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
  contractLink: string;
}

const DataShow = ({ title, value, badge, className, highlight = false, contractLink }: Props) => {
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
          {title.toLocaleLowerCase().includes('contrato') ? (
            <Link
              target="_blank"
              href={`https://etherscan.io/address/${contractLink}`}
            >
              <OpenInNewIcon style={{color: '#00EE8D'}} />
            </Link>
          ) : ''}
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

// atualização

export default DataShow