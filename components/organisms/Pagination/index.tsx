import React from 'react';

import Styles from './styles.module.scss';
import Button from '@/components/atoms/Button';

interface Props {
  limit: number;
  total: number;
  offSet: number;
}

export default function Pagination({ limit, total, offSet }: Props) {
  const maxItems = 7;
  const maxLeft = (maxItems - 1) / 2;
  const current = offSet ? (offSet / limit) + 1 : 1
  const pages = Math.ceil(total / limit)
  const first = Math.max(current - maxLeft, 1)

  return (
    <main className={Styles.main}>
      <ul style={{ color: 'black' }}>
        {Array.from({ length: maxItems })
          .map((_, index) => index + first)
          .map((page, i) => <Button
            key={`page${i + 1}`}
            hidden={false}
            id={`button-page-${i + 1}`}
            label='Clique para abrir a página'
            text={String(page)}
            onClick={() => { }}
            className={Styles.main__buttonPage}
          />)
        }
      </ul>
    </main>
  )
}