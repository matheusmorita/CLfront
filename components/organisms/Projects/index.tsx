/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Row from '@/molecules/Row'
import Project from '@/molecules/Project'

import { fetchDataAxios } from '@/utils/fetchDataAxios';

// languages
import en from '@/public/locales/en/common.json';
import pt from '@/public/locales/pt/common.json';
import { useRouter } from 'next/router';

const Projects = () => {
  const [projects, setProjects] = React.useState<any>([])

  const router = useRouter();

  const { locale } = router;

  const t = locale === 'en' ? en : pt

  React.useEffect(() => {
    fetchDataAxios("4", setProjects)
  }, [])

  return (
    <Row
      justifyContent='center'
    >
      {
        projects &&
        projects.map((item: any, index: number) => {
          return (
            <Project
            id={item.acronimo}
            idProject={item.id}
            text={(item.acronimo.includes('CLDG') || item.acronimo.includes('CLMT')) ? 'EM BREVE' : 'SAIBA MAIS'}
            name={item.nome}
            src={item.logoUrl}
            dataLanc={(item.acronimo.includes('CLDG') || item.acronimo.includes('CLMT')) ? 'EM BREVE' : item.dataLancamento}
            emissor={item.emissor?.nomeEmissor}
            rent={item.rentabilidade ? item.rentabilidade : null}
            path={item.idProjeto}
            key={index}
            showOrNot={
              (item.rentabilidade).toLowerCase() === 'sem rentabilidade' ? false : true }
          />
          )
            })
      }
    </Row>
  )
}

export default Projects