import Styles from './styles.module.scss'

function InputModal() {
  return (
    <div className={Styles.inputValueRs}>
      <input
        className={Styles.inputValue}
        step="0.01"
        min="0.01"
        type='number'
        value={2500.50}
        placeholder='0,00'
        id="inputValueReal"
        disabled
      />
      <label className={Styles.labelValue} htmlFor="inputValueReal">Insira o valor em Reais</label>
    </div>
  )
}

export default InputModal;