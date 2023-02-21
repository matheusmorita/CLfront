import React from 'react'
import Styles from './styles.module.scss'

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from 'next/link';

import i18next from '@/src/i18n'

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
  languageBrowser?: string;
}

const DataShow = ({ title, value, badge, className, highlight = false, contractLink, languageBrowser }: Props) => {
  return (
    <div
      className={`${Styles.datashow} ${className}`}
      data-highlight={highlight}
    >
      <div className={Styles.datashow__content}>
        <h1 className={Styles.datashow__title}>
          {languageBrowser !== 'pt-BR' ? i18next.t(title) : title}
        </h1>
        <span className={Styles.datashow__value}>
          {value}
          {title.toLocaleLowerCase().includes('contrato' || 'contract') ? (
            <Link
              target="_blank"
              href={`https://etherscan.io/address/${contractLink}`}
            >
              <OpenInNewIcon className={Styles.datashow__iconStyle} />
            </Link>
          ) : ''}
        </span>
      </div>
      {badge && (
        <div 
          className={Styles.datashow__badge}
          data-type={badge.type}
        >
          {languageBrowser !== 'pt-BR' ? i18next.t(badge.message) : badge.message}
        </div>
      )}
    </div>
  )
}

// atualização

export default DataShow