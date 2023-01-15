import Image from 'next/image'
import React from 'react'

// Static
import Styles from './styles.module.scss'
import Polygon from '@/assets/img/polygon.webp'
import Ethereum from '@/assets/img/ethereum.webp'

const Networks = () => {
  return (
    <div
      id='parcerias'
      role='contentinfo'
      aria-label='Nossas parcerias'
      className={Styles.networks}
    >
      <Image
        src={Polygon}
        alt='Logomarca da Polygon'
        className='mx-2'
        width={100}
        height={undefined}
      />
      <Image
        src={Ethereum}
        alt='Logomarca da Ethereum'
        className='mx-2'
        width={100}
        height={undefined}
      />
    </div>
  )
}

export default Networks