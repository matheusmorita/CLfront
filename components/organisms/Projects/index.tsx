/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Row from '@/molecules/Row'
import Project from '@/molecules/Project'

import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = React.useState<any>([])

  

  // const fetchData = async () => {
  //   // var data = JSON.stringify({
  //   //   "limit": 4
  //   // });

    

    // var config = {
    //   method: 'get',
    //   headers: {
    //     // 'X-Parse-Application-Id': 'dR30zBB72X8Hsrquh4DgPWRnJe8Nhd8N8AcQpXVU',
    //     // 'X-Parse-REST-API-Key': 'wFa33ak4LMUXxJpFtQbt1qtRaF4ALicVHSzjKFGi',
    //     'Content-Type': 'application/json'
    //   },
    // };

  //   await fetch(`https://coinlivre.blocklize.io/projeto/retornar?limit=${4}`, config)
  //     .then(resp => resp.json())
  //     .then(json => {
  //       setProjects(Object.values(json.result))
  //     })
  //     .catch(error => {
  //       throw error
  //     })
  // }

  const data = {
    limit: 4
  }

  const fetchData = async (data: {limit: number}) => {
    const response: any = await axios.get(`https://coinlivre.blocklize.io/projeto/retornar/?limit=${data.limit}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setProjects(response.data)
  }

  React.useEffect(() => {
    fetchData(data)
  }, [])

  return (
    <Row>
      {
        projects &&
        projects.map((item: any, index: number) => {
          return (
            <Project
            id={item.acronimo}
            name={item.nome}
            src={item.logoUrl}
            dataLanc={item.dataLancamento}
            emissor={'item.Emissor.nome precisa alterar'}
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