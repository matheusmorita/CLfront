import React from 'react'
import Row from '@/molecules/Row'
import Project from '@/molecules/Project'

// push para develop

const Projects = () => {
  const [projects, setProjects] = React.useState<any>([])

  const fetchData = async () => {
    var data = JSON.stringify({
      "limit": 4
    });

    var config = {
      method: 'post',
      headers: {
        'X-Parse-Application-Id': 'dR30zBB72X8Hsrquh4DgPWRnJe8Nhd8N8AcQpXVU',
        'X-Parse-REST-API-Key': 'wFa33ak4LMUXxJpFtQbt1qtRaF4ALicVHSzjKFGi',
        'Content-Type': 'application/json'
      },
      body: data
    };

    await fetch('https://parseapi.back4app.com/parse/functions/retornar-projetoV2', config)
      .then(resp => resp.json())
      .then(json => {
        setProjects(Object.values(json.result))
      })
      .catch(error => {
        throw error
      })
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <Row>
      {
        projects &&
        projects.map((item: any, index: number) => {
          return (
            <Project
            id={item.Projeto.acronimo}
            name={item.Projeto.nome}
            src={item.Projeto.logo.url}
            dataLanc={item.Projeto.data_lancamento}
            emissor={item.Emissor.nome}
            rent={item.Projeto.rentabilidade ? item.Projeto.rentabilidade : null}
            path={item.Projeto.idProjeto}
            key={index}
            showOrNot={
              item.Projeto.rentabilidade === '' ? false : true }
          />
          )
            })
      }
    </Row>
  )
}

export default Projects