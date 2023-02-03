import Styles from './styles.module.scss'

// import InputMask from "react-input-mask";


interface InputModalInterface {
  label: string;
  id: string;
  value?: string;
  disabled?: boolean;
  onChange?: any;
  maxLength?: number;
  placeholder?: string;
  className?: any;
}

function InputModal({ 
  label,
  id,
  value,
  disabled,
  onChange,
  placeholder,
  className,
}: InputModalInterface ) {
  return (
    <div className={Styles.inputValueRs}>
      <input
        className={className}
        type='string'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        disabled={disabled}
      />
      <label className={Styles.labelValue} htmlFor="inputValueReal">{label}</label>
    </div>
  )
}

export default InputModal;