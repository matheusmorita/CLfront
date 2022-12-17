import React from 'react'
import Styles from './styles.module.scss'

type Props = {
  color: string
}

const Separator = ({ color }: Props) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className={Styles.separator}
      aria-hidden={true}
    />
  )
}

export default Separator