import React from 'react'
import Row from '../../molecules/Row'
import Project from '../../molecules/Project'
import Logo from '../../../assets/img/bg2.webp'

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

    await fetch('https://parseapi.back4app.com/parse/functions/retornar-projeto', config)
      .then(resp => resp.json())
      .then(json => {
        setProjects(Object.values(json.result))
      })
      .catch(error => {
        throw error
      })
  }

  React.useEffect(() => {
    // fetchData()
    setProjects([
      {acronimo: 'ACRONIMO', nome: 'Project title definition', data: '22/06/2035', emissor: 'GDN INNOVATION', rent: "180%", path: "1"},
      {acronimo: 'ACRONIMO', nome: 'Project title definition', data: '22/06/2035', emissor: 'GDN INNOVATION', rent: "180%", path: "1"},
      {acronimo: 'ACRONIMO', nome: 'Project title definition', data: '22/06/2035', emissor: 'GDN INNOVATION', rent: "180%", path: "1"},
      {acronimo: 'ACRONIMO', nome: 'Project title definition', data: '22/06/2035', emissor: 'GDN INNOVATION', rent: "180%", path: "1"},
    ])
  }, [])

  return (
    <Row>
      {
        projects &&
        projects.map((item: any, index: number) => (
          <Project
            id={item.acronimo}
            name={item.nome}
            src={Logo}
            desc={item.resumo}
            dataLanc={item.data}
            emissor={item.emissor}
            rent={item.rent}
            path={item.path}
            key={index}
          />
        ))
      }
    </Row>
  )
}

export default Projects