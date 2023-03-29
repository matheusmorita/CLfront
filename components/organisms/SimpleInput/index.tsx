import React, {ChangeEvent} from 'react';

import Styles from './styles.module.scss';

interface Props {
  className: string;
  label?: string;
  type: string;
  id: string;
  placeholder?: string;
  maxLength?: number;
  onChange?: any
}

export default function SimpleInput({ 
  className,
  label,
  type,
  id,
  placeholder,
  maxLength,
  onChange
}: Props) {
  return (
    <>
      <label htmlFor={id} className={Styles.label}>
          {label}
        </label>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={className}
          maxLength={maxLength}
          onChange={onChange}
        />
    </>
  )
}