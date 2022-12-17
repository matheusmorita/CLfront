import React from 'react'
import Styles from './styles.module.scss'

type Props = {
  id: string,
  children?: any,
  onSubmit: Function,
  className?: string,
  label: string
}

const Form = ({ id, children, onSubmit, className, label }: Props) => {
  return (
    <form
      id={`form-${id}`}
      className={`${Styles.form} ${className}`}
      aia-label={label}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      {children}
    </form>
  )
}

export default Form