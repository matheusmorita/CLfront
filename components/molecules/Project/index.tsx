import React from 'react'
import Image from 'next/image'
import Styles from './styles.module.scss'
import Column from '@/components/molecules/Column'
import Button from '@/components/atoms/Button'
import { useTranslation } from 'react-i18next'
import UserContext from '@/context/UserContext'

type Props = {
  id: string,
  name: string,
  src: any,
  dataLanc: string,
  emissor: string,
  rent: string,
  path: string,
  showOrNot?: boolean,
  idProject: string
  text: string;
}

const Project = ({ id, src, name, dataLanc, emissor, rent, path, showOrNot, idProject, text }: Props) => {
  const [projectDisabled, setProjectDisabled] = React.useState<boolean>(false)
  const { t } = useTranslation();

  const { locale } = React.useContext(UserContext)

  const callRentText = () => {
    if (rent) {
      return rent
    }

    return "Não informada"
  }

  React.useEffect(() => {
    if (name.includes('Recebíveis') || name.includes('Influenciadores')) {
      setProjectDisabled(!projectDisabled)
    }
  }, [])

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
        style={{ height: '100%' }}
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
          <div style={{ padding: '15px' }}>
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
              {locale === 'en-US' ? t('Data de lançamento') : 'Data de lançamento'}  <b>{dataLanc}</b> <br />
              {locale === 'en-US' ? t('Emitido por') : 'Emitido por'} <b>{emissor}</b> <br />
              {showOrNot ? (
                <span className={Styles.project__details}>
                  {locale === 'en-US' ? t('Rentabilidade estimada de até ') : 'Rentabilidade estimada de até '}
                  <b>{callRentText()}</b>
                </span>
              ) : ''}
            </p>
          </div>
        </div>

        <div
          className={Styles.project__info}
        >
          <div>
            <Button
              id={`project-cta-${id}`}
              text={locale === 'en-US' ? t(text) : text}
              label="Clique e veja mais sobre o projeto"
              className={`w-100 mb-3 ${name.includes('Recebíveis') || name.includes('Influenciadores') ? Styles.project__button : ''}`}
              hidden={false}
              disabled={name.includes('Recebíveis') || name.includes('Influenciadores')}
              onClick={() => {
                localStorage.setItem('idProject', idProject)
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