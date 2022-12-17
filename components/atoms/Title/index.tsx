import React from 'react'
import Styles from './styles.module.scss'

type Props = {
  id?: string,
  text?: string,
  className?: string,
  hidden?: boolean,
  width?: number,
  color?: string
}

const Title = ({ id, className, text, hidden, width, color }: Props) => {
  return (
    <h1
      id={id}
      aria-hidden={hidden}
      className={`${Styles.title} ${className}`}
      style={{maxWidth: `${width}ch`, color: color}}
    >
      {text}
    </h1>
  )
}

export default Title