/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Row from '@/molecules/Row'
import Project from '@/molecules/Project'

import { fetchDataAxios } from '@/utils/fetchDataAxios';
import { useTranslation } from 'react-i18next';
import UserContext from '@/context/UserContext';

const Projects = () => {
  const [projects, setProjects] = React.useState<any>([])
  const [languageBrowser, setLanguageBrowser] = React.useState<string>();
  const { t } = useTranslation();

  const { locale } = React.useContext(UserContext)

  React.useEffect(() => {
    fetchDataAxios("4", setProjects)
    const language = window.navigator.language
    setLanguageBrowser(language)
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
            text={(item.acronimo.includes('CLDG') || item.acronimo.includes('CLMT')) ? 'EM BREVE' : 'SAIBA MAIS'}
            name={languageBrowser !== 'pt-BR' ? t(item.nome) : item.nome}
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