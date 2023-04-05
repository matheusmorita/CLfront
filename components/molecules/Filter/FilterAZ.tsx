import React from 'react';

import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

import Styles from './styles.module.scss';


export default function FilterAZ () {
    return (
        <div className={Styles.main__divSpec}>
          <button className={Styles.main__buttonOrderAZ}>
            <SortByAlphaIcon className={Styles.main__orderIcon} />
            <span className={Styles.main__spanText}>Classificar de A a Z</span>
          </button>
          <button className={Styles.main__buttonOrderAZ}>
            <SortByAlphaIcon className={Styles.main__orderIcon} />
            <span className={Styles.main__spanText}>Classificar de Z a A</span>
          </button>
        </div>
    )
}