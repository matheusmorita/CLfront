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
  path: string,
  showOrNot?: boolean,
}

const Project = ({ id, src, name, dataLanc, emissor, rent, path, showOrNot }: Props) => {

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
        style={{height: '100%'}}
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
        <div 
          style={{
            height: '100%',
          }}
          className={Styles.project__info}
          >
          <div style={{height: '32%'}}>
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
              { showOrNot ? <p className={Styles.project__details}>Rentabilidade estimada de até <b>{callRentText()}</b></p> : ''}
            </p>
          </div>
          <div>
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
      </div>
    </Column>
  )
}

export default Project