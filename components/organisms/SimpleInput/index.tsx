import React, { ChangeEvent } from 'react';

import Styles from './styles.module.scss';

import InputMask from 'react-input-mask';

interface Props {
  className: string;
  label?: string;
  type: string;
  id: string;
  placeholder?: string;
  maxLength?: number;
  onChange?: any;
  required?: boolean
  min?: number;
  disabled?: boolean;
}

export default function SimpleInput({
  className,
  label,
  type,
  id,
  placeholder,
  maxLength,
  onChange,
  required,
  min,
  disabled
}: Props) {
  return (
    <>
      <label htmlFor={id} className={Styles.label}>
        {label}
      </label>
      {type === 'number' ? (
        <InputMask
          mask=''
          id={id}
          type={type}
          placeholder={placeholder}
          className={className}
          maxLength={maxLength}
          onChange={onChange}
          required={required}
          min={min}
          disabled={disabled}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={className}
          maxLength={maxLength}
          onChange={onChange}
          required={required}
          min={min}
          disabled={disabled}
        />
      )}
    </>
  )
}