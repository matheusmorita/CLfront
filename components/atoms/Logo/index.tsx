import React from 'react'
import Image from 'next/image'
import Source from '../../../assets/img/logo.webp'

import Styles from './styles.module.scss'

const Logo = () => {
  const width = 200
  const height = undefined
  const alt = "Logomarca da Coinlivre"

  return (
    <figure className={Styles.figure}>
      <Image
        alt={alt}
        src={Source}
        width={width}
        height={height}
      />
    </figure>
  )
}

export default Logo