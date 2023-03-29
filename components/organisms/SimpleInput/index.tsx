import React from 'react';

import Styles from './styles.module.scss';

interface Props {
  className: string;
  label?: string;
  type: string;
  id: string;
  placeholder?: string;
}

export default function SimpleInput({ 
  className,
  label,
  type,
  id,
  placeholder
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
        />
    </>
  )
}