import React from 'react'
import Image from 'next/image'
import Styles from './styles.module.scss'
import Column from '@/components/molecules/Column'
import Button from '@/components/atoms/Button'
import UserContext from '@/context/UserContext'
import { useRouter } from 'next/router'

import { formatDate, formatOnlyDate } from '@/utils/formatDate';

// languages
import en from '@/public/locales/en/common.json';
import pt from '@/public/locales/pt/common.json';
import ProjectContext from '@/context/ProjectContext'
import Loader from '@/components/atoms/Loader'
import Link from 'next/link'
import Status from '@/components/atoms/Status'

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
  project?: any;
}

const Project = ({ id, src, name, dataLanc, emissor, rent, path, showOrNot, idProject, text, project }: Props) => {
  const [projectDisabled, setProjectDisabled] = React.useState<boolean>(false)
  const [waiting, setWaiting] = React.useState<boolean>(false)

  const { setProjectSelectedContext } = React.useContext(ProjectContext);

  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : pt

  React.useEffect(() => {
    // const beforePath = localStorage.getItem('beforePath')
    // router.push(`${beforePath}`)
    console.log('acronimo' + id)
  })

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
      maxWidth='350px'
    >
      <div
        id={id}
        role="contentinfo"
        className={Styles.project}
        aria-labelledby={`project-title-${id}`}
        aria-describedby={`project-description-${id}`}
        style={{ height: '100%' }}
      >
        <Status text={(project?.lotes[project?.lotes.length - 1]?.status === null || project?.lotes[project?.lotes.length - 1]?.status === undefined) ? 'Default' : project?.lotes[project?.lotes.length - 1]?.status} />
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
            <Loader style={{ position: 'absolute' }} absolute={false} active={waiting} />

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
              {t.launchDate}<b> {formatOnlyDate(dataLanc) || t.commingSoon}</b> <br />
              {t.projectOwner} <b> {emissor}</b> <br />
              {showOrNot ? (
                <span style={{ gap: '2%', display: 'flex' }} className={Styles.project__details}>
                  {t.profitability}
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
            <Link
              key={id}
              href={`projeto/${name.toLowerCase().replace(/\s/g, '-')}`}
              locale={locale}
            >
              <Button
                id={`project-cta-${id}`}
                text={(id.includes('CLDG') || id.includes('CLMT')) ? t.commingSoon : t.seeMore}
                label="Clique e veja mais sobre o projeto"
                className={`w-100 mb-3 ${id.includes('CLDG') || id.includes('CLMT') ? Styles.project__button : ''}`}
                hidden={false}
                disabled={id.includes('CLDG') || id.includes('CLMT')}
                onClick={() => {
                  localStorage.setItem('idProject', idProject)
                  // location.href = `projeto/${path}`
                  // router.push(`projeto/${name.toLowerCase().replace(/\s/g, '-')}`)
                  setWaiting(!waiting)
                  // setProjectSelectedContext(project)
                }}
              />
            </Link>
          </div>
        </div>
      </div>
    </Column>
  )
}

export default Project