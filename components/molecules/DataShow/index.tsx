import React from 'react'
import Styles from './styles.module.scss'

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from 'next/link';

// languages
import en from '@/public/locales/en/common.json';
import pt from '@/public/locales/pt/common.json';
import { useRouter } from 'next/router';

type Badge = {
  message: string,
  type?: "success" | "warning" | "error"
}

type Props = {
  title: string,
  value: string | any,
  badge?: Badge,
  highlight?: boolean,
  className?: string,
  contractLink: string;
  linkTrue?: boolean
}

const DataShow = ({ title, value, badge, className, highlight = false, contractLink, linkTrue }: Props) => {
  const router = useRouter();
  const { locale } = router;
  
  const t = locale === 'en' ? en : pt;

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
          {value === 'Sem rentabilidade'  ? t.throughBenefits : value}
          {linkTrue && (
            <Link
            target="_blank"
            href={`https://polygonscan.com/address/${contractLink}`}
          >
            <OpenInNewIcon className={Styles.datashow__iconStyle} />
          </Link>
          )}
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