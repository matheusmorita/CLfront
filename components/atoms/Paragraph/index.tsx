import React from 'react'
import Styles from './styles.module.scss'

type Props = {
  id?: string,
  text?: string | any,
  className?: string,
  hidden?: boolean,
  size?: number,
  width?: number,
  height?: number,
  color?: string,
  weight?: string | number,
}

const Paragrah = ({ id, className, text, hidden, width, size, color, height, weight }: Props) => {
  return (
    <p
      id={id}
      aria-hidden={hidden}
      className={`${Styles.paragraph} ${className}`}
      style={{
        maxWidth: `${width}ch`,
        color: color,
        fontSize: `${size}px`,
        fontWeight: weight,
        lineHeight: `${height}px`
      }}
    >
      {text}
    </p>
  )
}

export default Paragrah