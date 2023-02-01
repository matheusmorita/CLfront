import Styles from './styles.module.scss'

interface InputModalInterface {
  label: string;
  id: string;
  value?: number;
  disabled?: boolean;
  onChange?: any;
}

function InputModal({ label, id, value, disabled, onChange }: InputModalInterface ) {
  return (
    <div className={Styles.inputValueRs}>
      <input
        className={Styles.inputValue}
        step="0.01"
        min="0.01"
        type='number'
        value={value}
        onChange={onChange}
        placeholder='0,00'
        id={id}
        disabled={disabled}
      />
      <label className={Styles.labelValue} htmlFor="inputValueReal">{label}</label>
    </div>
  )
}

export default InputModal;