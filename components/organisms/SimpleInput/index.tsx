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
  min
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
        />
      )}
    </>
  )
}