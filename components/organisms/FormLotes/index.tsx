import React from 'react';
import SimpleInput from '../SimpleInput';
import TableRegister from '../TableRegister';

import Styles from './styles.module.scss';

export default function FormLotes() {
  const [radioSelected, setRadioSelected] = React.useState();

  const handleChangeInputRadio = (e: any) => {
    setRadioSelected(e.target.id)
  }

  return (
    <form className={Styles.formLotes}>
      <h2 style={{ margin: '2% 0', textAlign: 'center' }}>Lotes do projeto</h2>
      <div className={Styles.formLotes__divInputOneLote}>
        <label className={Styles.formLotes__labelCheckbox}>
          <input onChange={handleChangeInputRadio} id='radioUniqueToken' name='typeLote' type='radio' />
          <span className={Styles.formLotes__textCheckboxLabel}>Marque esta opção caso o projeto tenha apenas um lote</span>
        </label>
        {radioSelected === 'radioUniqueToken' && (
          <div>
            <strong className={Styles.titleInputRent}>Valor do token (R$) </strong>
            <SimpleInput
              className={Styles.formLotes__inputText}
              id='valorDoLote'
              type='text'
            />
          </div>
        )}
      </div>

      <div className={Styles.formLotes__divInputOneLote}>
        <label className={Styles.formLotes__labelCheckbox}>
          <input onChange={handleChangeInputRadio} id='radioMoreToken' name='typeLote' type='radio' />
          <span className={Styles.formLotes__textCheckboxLabel}>Marque esta opção caso o projeto tenha mais de um lote</span>
        </label>
        {radioSelected === 'radioMoreToken' && (
          <div className={Styles.overflowStyle}>
            <TableRegister />
          </div>
        )}
      </div>
    </form>
  )
}