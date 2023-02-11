import React from 'react'
import Image from 'next/image'
import SourceBlack from '@/assets/img/logo.webp'
import SourceWhite from '@/assets/img/logo-white.webp'
import BrandBlack from '@/assets/img/brand.webp'
import BrandWhite from '@/assets/img/brand-white.webp'
import Styles from './styles.module.scss'

type Props = {
  white: boolean,
  redirect?: boolean,
  width?: number,
  responsive?: boolean,
}

const Logo = ({ white, redirect = false, width = 200, responsive = false }: Props) => {
  const height = undefined
  const alt = "Logomarca da Coinlivre"

  const setRedirect = () => {
    return redirect ? location.href = '/' : null
  }

  const handleSourceWhite = () => {
    return responsive ? BrandWhite : SourceWhite
  }

  const handleSourceBlack = () => {
    return responsive ? BrandBlack : SourceBlack
  }

  const handleResponsiveWidth = () => {
    return responsive ? width / 4 : width
  }

  return (
    <figure
      className={Styles.figure}
      onClick={setRedirect}
    >
      <Image
        alt={alt}
        height={height}
        width={handleResponsiveWidth()}
        src={!white ? handleSourceWhite() : handleSourceBlack()}
      />
    </figure>
  )
}

export default Logo