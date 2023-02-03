import Styles from './styles.module.scss'

// import InputMask from "react-input-mask";


interface InputModalInterface {
  label: string;
  id: string;
  value?: string;
  disabled?: boolean;
  onChange?: any;
  maxLength?: number;
}

function InputModal({ 
  label,
  id,
  value,
  disabled,
  onChange,
  maxLength,
}: InputModalInterface ) {
  return (
    <div className={Styles.inputValueRs}>
      <input
        // mask='9999,99'
        className={Styles.inputValue}
        // step="0.01"
        // min="0.01"
        type='string'
        // maxLength={maxLength}
        value={value}
        onChange={onChange}
        // dir='rtl'
        placeholder='0000,00'
        id={id}
        disabled={disabled}
      />
      <label className={Styles.labelValue} htmlFor="inputValueReal">{label}</label>
    </div>
  )
}

export default InputModal;