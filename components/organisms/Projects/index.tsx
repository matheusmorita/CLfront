/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Row from '@/molecules/Row'
import Project from '@/molecules/Project'

import { fetchDataAxios } from '@/utils/fetchDataAxios';

const Projects = () => {
  const [projects, setProjects] = React.useState<any>([])

  React.useEffect(() => {
    fetchDataAxios("4", setProjects)
  }, [])

  return (
    <Row>
      {
        projects &&
        projects.map((item: any, index: number) => {
          return (
            <Project
            id={item.acronimo}
            idProject={item.id}
            name={item.nome}
            src={item.logoUrl}
            dataLanc={item.dataLancamento}
            emissor={item.emissor.nomeEmissor}
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