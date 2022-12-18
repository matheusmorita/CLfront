import React from 'react'
import Styles from './styles.module.scss'

type Props = {
  id?: string,
  text?: string,
  className?: string,
  hidden?: boolean,
  size?: number,
  width?: number,
  color?: string
}

const Title = ({ id, className, text, hidden, width, color, size }: Props) => {
  return (
    <h1
      id={id}
      aria-hidden={hidden}
      className={`${Styles.title} ${className}`}
      style={{maxWidth: `${width}ch`, color: color, fontSize: `${size}px`}}
    >
      {text}
    </h1>
  )
}

export default Title