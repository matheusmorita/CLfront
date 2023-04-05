import React from 'react';

//assets
import FilterListIcon from '@mui/icons-material/FilterList';

//styles
import Styles from './styles.module.scss';
import FilterAZ from './FilterAZ';
import FilterStatus from './FilterStatus';

interface Props {
  label: string;
  onClick: any;
  showOrderFilter?: boolean;
  showStatusFilter?: boolean;
}


export default function Filter({
  onClick,
  showOrderFilter,
  showStatusFilter,
  label
}: Props) {

  return (
    <main className={Styles.main}>
      <button
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

    </main>
  )
}