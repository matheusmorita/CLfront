import React from 'react'
import Styles from './styles.module.scss'

type Props = {
  id?: string,
  text?: string,
  className?: string,
  hidden?: boolean,
  width?: number,
  size?: number,
  color?: string
}

const Paragrah = ({ id, className, text, hidden, width, size, color }: Props) => {
  return (
    <p
      id={id}
      aria-hidden={hidden}
      className={`${Styles.paragraph} ${className}`}
      style={{ maxWidth: `${width}ch`, fontSize: `${size}px`, color: color }}
    >
      {text}
    </p>
  )
}

export default Paragrah