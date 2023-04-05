import React from 'react';

import Styles from './styles.module.scss';


export default function FilterDate() {
    return (
        <div className={Styles.main__divFilterDate}>
            <label htmlFor='initDate'>
                <span>Início: </span>
                <input id='initDate' type='date' />
            </label>
            <label htmlFor='initDate'>
                <span>Final: </span>
                <input id='initDate' type='date' />
            </label>
            <div>
                <label htmlFor='checkboxOnlyInit'>
                    <input id='checkboxOnlyInit' type='checkbox' />
                    <span>Apenas início</span>
                </label>
            </div>
            <button type='button' className={Styles.main__buttonSearch}>Pesquisar</button>
        </div>
    )
}