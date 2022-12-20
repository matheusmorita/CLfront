import React from 'react'
import Image from 'next/image'
import Source from '../../../assets/img/logo.webp'
import SourceWhite from '../../../assets/img/logo-white.webp'
import Styles from './styles.module.scss'

type Props = {
  white: boolean
}

const Logo = ({ white }: Props) => {
  const width = 200
  const height = undefined
  const alt = "Logomarca da Coinlivre"

  return (
    <figure className={Styles.figure}>
      <Image
        alt={alt}
        width={width}
        height={height}
        src={white ? SourceWhite : Source}
      />
    </figure>
  )
}

export default Logo