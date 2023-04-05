import React from 'react';

import Styles from './styles.module.scss';


export default function FilterEmissor() {
    return (
        <div className={Styles.main__divFilterEmissor}>
            <label htmlFor='gdnCheckbox'>
                <input id='gdnCheckbox' type='checkbox' />
                <span>GDN</span>
            </label>
            <label htmlFor='emissor1'>
                <input id='emissor1' type='checkbox' />
                <span>Emissor 1</span>
            </label>
            <label htmlFor='emissor2'>
                <input id='emissor2' type='checkbox' />
                <span>Emissor 2</span>
            </label>
        </div>
    )
}