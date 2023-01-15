import React from 'react'
import Styles from './styles.module.scss'
import Cross from '@/assets/img/Cross.svg'
import Image from 'next/image'

type Props = {
  id: string,
  ask: string,
  answer: string,
  className: string
}

const Flip = ({ id, ask, answer, className }: Props) => {
  return (
    <div
      id={id}
      role="contentinfo"
      className={`${Styles.flip} ${className}`}
      aria-labelledby={`faq-title-${id}`}
      aria-describedby={`faq-description-${id}`}
    >
      <p
        id={`faq-id-${id}`}
        aria-label={ask}
        className={`${Styles.flip__id} fw-normal`}
      >
        {id}
      </p>
      <button
        className={Styles.flip__close}
        onClick={() => {

        }}
      >
        <Image
          src={Cross}
          alt='Ícone de fechar'
          width={20}
        />
      </button>
      <div className={Styles.flip__inner}>
        <div className={Styles.flip__front}>
          <h1
            id={`faq-title-${id}`}
            className={Styles.flip__title}
            aria-label={ask}
          >
            {ask}
          </h1>
        </div>
        <div className={Styles.flip__back}>
          <p
            id={`faq-description-${id}`}
            className={Styles.flip__desc}
            aria-label={answer}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Flip