import React from 'react'
import Styles from './styles.module.scss'

type Props = {
  color: string,
  size?: number
}

const Separator = ({ color, size }: Props) => {
  return (
    <div
      style={{ backgroundColor: color, width: `${size}px` }}
      className={Styles.separator}
      aria-hidden={true}
    />
  )
}

export default Separator