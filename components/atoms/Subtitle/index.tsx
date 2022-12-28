import React from 'react'
import Styles from './styles.module.scss'

type Props = {
  id?: string,
  text?: string,
  className?: string,
  hidden?: boolean,
  size?: number,
  width?: number,
  height?: number,
  color?: string,
  weight?: string | number,
}

const Subtitle = ({ id, className, text, hidden, width, color, size, height, weight }: Props) => {
  return (
    <h1
      id={id}
      aria-hidden={hidden}
      className={`${Styles.subtitle} ${className}`}
      style={{
        maxWidth: `${width}ch`,
        color: color,
        fontSize: `${size}px`,
        fontWeight: weight,
        lineHeight: `${height}px`
      }}
    >
      {text}
    </h1>
  )
}

export default Subtitle