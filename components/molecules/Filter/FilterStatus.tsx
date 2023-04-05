import React from 'react';

import Styles from './styles.module.scss';


export default function FilterStatus () {
    return (
        <div className={Styles.main__divFilterStatus}>
          <label htmlFor='emBreve'>
            <input id='emBreve' type='checkbox' />
            <span>Em breve</span>
          </label>

          <label htmlFor='rodadaVip'>
            <input id='rodadaVip' type='checkbox' />
            <span>Rodada Vip</span>
          </label>

          <label htmlFor='emCaptacao'>
            <input id='emCaptacao' type='checkbox' />
            <span>Em Captação</span>
          </label>

          <label htmlFor='emImplementacao'>
            <input id='emImplementacao' type='checkbox' />
            <span>Em implementação</span>
          </label>

          <label htmlFor='Ativo'>
            <input id='Ativo' type='checkbox' />
            <span>Ativo</span>
          </label>
        </div>
    )
}