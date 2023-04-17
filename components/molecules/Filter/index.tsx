import React from 'react';

//assets
import FilterListIcon from '@mui/icons-material/FilterList';

//styles
import Styles from './styles.module.scss';
import FilterAZ from './FilterAZ';
import FilterStatus from './FilterStatus';
import FilterDate from './FilterDate';
import FilterEmissor from './FilterEmissor';

interface Props {
  label: string;
  onClick: any;
  showOrderFilter?: boolean;
  showStatusFilter?: boolean;
  showDateFilter?: boolean;
  showEmissorFilter?: boolean;
  id?: string;
}


export default function Filter({
  onClick,
  showOrderFilter,
  showStatusFilter,
  showDateFilter,
  showEmissorFilter,
  label,
  id
}: Props) {

  return (
    <main className={Styles.main}>
      <button
        id={id}
        type='button'
        className={Styles.main__button}
        onClick={onClick}
      >
        {label}
        <FilterListIcon
          className={Styles.main__iconFilterStyle}
        />
      </button>
      {showOrderFilter && (
        <FilterAZ />
      )}

      {showStatusFilter && (
        <FilterStatus />
      )}

      {showDateFilter && (
        <FilterDate />
      )}

      {showEmissorFilter && (
        <FilterEmissor />
      )}
    </main>
  )
}