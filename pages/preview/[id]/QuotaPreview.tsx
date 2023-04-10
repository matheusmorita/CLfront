import React from 'react'
import Styles from './styles.module.scss'

import { useRouter } from 'next/router';

// languages
import en from '@/public/locales/en/common.json';
import pt from '@/public/locales/pt/common.json';
import { formatOnlyDate } from '@/utils/formatDate';

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
  vencimento: string,
  project?: any,
}

const QuotaShowPreview = ({
  title,
  value,
  badge,
  className,
  parcela,
  valor,
  juros,
  vencimento,
  project,
}: Props) => {


  const router = useRouter();

  const { locale } = router;

  const t = locale === 'en' ? en : pt

  return (
    <div
      className={`${Styles.quotashow} ${className}`}
    >
      <div className={Styles.quotashow__content}>
        <div className={Styles.quotashow__data}>
          <h1 className={Styles.quotashow__title}>
          {project?.acronimo !== 'CLGT' ?  t.installment : t.date }
          </h1>
          <span className={Styles.quotashow__value}>
            {formatOnlyDate(project?.dateBenefit) || t.commingSoon}
          </span>
        </div>
        <div className={Styles.quotashow__data}>
          <h1 className={Styles.quotashow__title}>
          {project?.acronimo !== 'CLGT' ? t.return : t.benefit}
          </h1>
          <span className={Styles.quotashow__value}>
          {project?.benefitName || t.commingSoon }
          </span>
        </div>
        <div className={Styles.quotashow__data}>
          <h1 className={Styles.quotashow__title}>
          {<>Status</>}
          </h1>
          <span className={Styles.quotashow__value}>
          {project?.benefitStatus || t.commingSoon }
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

export default QuotaShowPreview