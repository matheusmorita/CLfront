import React from 'react'
import Styles from './styles.module.scss'

type Props = {
  id: string,
  type: string,
  label: string,
  disabled?: boolean
  error?: boolean,
  onInput?: any,
  validation?: any,
  className?: string,
  minLength?: number,
  maxLength?: number,
  required?: boolean,
  validator?: any
  placeholder?: string;
  onChange?: any;
  value?: string;
}

const Input = ({
  id,
  type,
  error,
  onInput,
  disabled,
  placeholder,
  className,
  minLength,
  maxLength,
  required,
  label,
  validation,
  validator,
  onChange,
  value
}: Props) => {
  const InputRef = React.useRef<any>(null)

  // const handleInputValue = () => {
  //   handleInputValidation()
  //   onInput(InputRef.current.value)
  // }

  // const handleInputValidation = () => {
  //   if (validator && validation) {
  //     validation(validator(InputRef.current.value))
  //   }
  // }

  return (
    <div
      className={Styles.group}
      data-error={error}
    >
      <input
        id={id}
        name={id}
        type={type}
        disabled={disabled}
        className={`${Styles.input} ${className}`}
        // onInput={handleInputValue}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        ref={InputRef}
        onChange={onChange}
        value={value}
      />
      <label
        htmlFor={id}
        aria-label={label}
        className={Styles.label}
      >
        {label}
      </label>
    </div>
  )
}

export default Input