import React from 'react'
import Image from 'next/image'
import Styles from './styles.module.scss'

// Static
import Discord from '@/assets/img/logo-discord.webp'
import Instagram from '@/assets/img/logo-instagram.webp'
import Facebook from '@/assets/img/logo-facebook.webp'
import Linkedin from '@/assets/img/logo-linkedin.webp'
import Youtube from '@/assets/img/logo-youtube.webp'
import Title from '@/atoms/Title'

type Props = {
  width: number,
  className?: string,
  label?: string
}

const Social = ({ width, className, label }: Props) => {
  return (
    <div
      aria-labelledby='social-title' 
      className={`${Styles.social} ${className}`}
    >
      <Title
        id='social-title'
        text={label}
        className='visually-hidden'
        hidden={false}
      />
      <a
        href="https://discord.gg/Xx9U4j74Aa"
        target="_blank"
        rel="noopener noreferrer"
        className={Styles.social__link}
      >
        <Image
          src={Discord}
          width={width}
          height={undefined}
          alt="Logo do Discord"
        />
      </a>
      <a
        href="https://www.instagram.com/coinlivre_/"
        target="_blank"
        rel="noopener noreferrer"
        className={Styles.social__link}
      >
        <Image
          src={Instagram}
          width={width}
          height={undefined}
          alt="Logo do Instagram"
        />
      </a>
      <a
        href="https://www.linkedin.com/company/coinlivre/"
        target="_blank"
        rel="noopener noreferrer"
        className={Styles.social__link}
      >
        <Image
          src={Linkedin}
          width={width}
          height={undefined}
          alt="Logo do Linkedin"
        />
      </a>
      <a
        href="https://www.youtube.com/@metacast9068"
        target="_blank"
        rel="noopener noreferrer"
        className={Styles.social__link}
      >
        <Image
          src={Youtube}
          width={width}
          height={undefined}
          alt="Logo do Youtube"
        />
      </a>
    </div>
  )
}

export default Social