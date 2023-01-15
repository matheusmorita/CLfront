import React from 'react'
import Styles from './styles.module.scss'

type Props = {
  id: string,
  type: string,
  label: string,
  disabled?: boolean
  error?: boolean,
  onInput?: any,
  className?: string,
  minLength?: number,
  maxLength?: number,
  required?: boolean,
}

const Input = ({id, type, error, onInput, disabled, className, minLength, maxLength, required, label}: Props) => {
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
        onInput={onInput}
        placeholder=' '
        minLength={minLength}
        maxLength={maxLength}
        required={required}
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