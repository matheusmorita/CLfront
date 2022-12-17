import React from 'react'
import Styles from './styles.module.scss'

type Props = {
  id: string,
  label: string,
  hidden: boolean,
  text: string,
  onClick: any,
  disabled: boolean,
  className?: string
}

const Button = ({ id, label, hidden, disabled, text, onClick, className }: Props) => {
  return (
    <button
      id={id}
      aria-label={label}
      aria-hidden={hidden}
      disabled={disabled}
      onClick={onClick}
      className={`${Styles.button} ${className}`}
    >
      {text}
    </button>
  )
}

export default Button