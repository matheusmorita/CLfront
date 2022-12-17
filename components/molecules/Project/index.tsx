import React from 'react'
import Image from 'next/image'
import Styles from './styles.module.scss'
import Title from '../../atoms/Title'
import Column from '../Column'

type Props = {
  id: string,
  name: string,
  desc: string,
  src: any,
}

const Project = ({ id, src, name, desc }: Props) => {
  return (
    <Column
      media='lg'
      size={3}
    >
      <div
        id={id}
        role="contentinfo"
        className={Styles.project}
        aria-labelledby={`project-title-${id}`}
        aria-describedby={`project-description-${id}`}
      >
        <div
          className={Styles.project__header}
        >
          <Image
            src={src}
            alt="Imagem do projeto"
            width={500}
            height={200}
            className='w-100'
          />
        </div>
        <div className={Styles.project__info}>
          <h1
            id={`project-title-${id}`}
            className={Styles.project__title}
          >
            {name}
            <span>
              {`#${id}`}
            </span>
          </h1>
          <p
            id={`project-description-${id}`}
            className={Styles.project__description}
          >
            {desc}
          </p>
        </div>
      </div>
    </Column>
  )
}

export default Project