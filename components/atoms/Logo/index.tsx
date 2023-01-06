import React from 'react'
import Image from 'next/image'
import Source from '../../../assets/img/logo.webp'
import SourceWhite from '../../../assets/img/logo-white.webp'
import Styles from './styles.module.scss'

type Props = {
  white: boolean,
  redirect?: boolean
}

const Logo = ({ white, redirect = false }: Props) => {
  const width = 200
  const height = undefined
  const alt = "Logomarca da Coinlivre"

  const setRedirect = () => {
    return redirect ? location.href = '/' : null
  }

  return (
    <figure
      className={Styles.figure}
      onClick={setRedirect}
    >
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