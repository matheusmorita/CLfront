import React from 'react'
import Image from 'next/image'
import Styles from './styles.module.scss'
import Column from '@/components/molecules/Column'
import Button from '@/components/atoms/Button'

type Props = {
  id: string,
  name: string,
  src: any,
  dataLanc: string,
  emissor: string,
  rent: string,
  path: string
}

const Project = ({ id, src, name, dataLanc, emissor, rent, path }: Props) => {

  const callRentText = () => {
    if (rent) {
      return rent
    }

    return "Não informada"
  }

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
            className={Styles.project__details}
          >
            Data de lançamento <b>{dataLanc}</b> <br />
            Emitido por <b>{emissor}</b> <br />
            Rentabilidade de até <b>{callRentText()}</b>
          </p>
          <Button
            id="header-cta"
            text="SAIBA MAIS"
            label="Clique e veja mais sobre o projeto"
            className="w-100 mb-3"
            hidden={false}
            disabled={false}
            onClick={() => {
              location.href = `projeto/${path}`
            }}
          />
        </div>
      </div>
    </Column>
  )
}

export default Project