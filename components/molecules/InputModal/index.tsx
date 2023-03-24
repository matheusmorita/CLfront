import React from 'react'
import { NumericFormat } from 'react-number-format'
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
  onClick?: any;
  readOnly?: any;
  style?: object;
  prefix?: string;
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
  value,
  onClick,
  readOnly,
  style,
  prefix
}: Props) => {

  return (
    <div
      className={Styles.group}
      data-error={error}
    >
      <NumericFormat 
        id={id}
        prefix={prefix}
        placeholder={placeholder}
        type='text'
        thousandSeparator="."
        decimalSeparator=','
        allowLeadingZeros
        className={`${Styles.input} ${className}`}
        onClick={onClick}
        onChange={onChange}
        readOnly={readOnly}
        value={value}
        style={style}
        name={id}
        disabled={disabled}
        onInput={onInput}
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