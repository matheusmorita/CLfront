import Button from '@/components/atoms/Button';
import React from 'react';

import Styles from './styles.module.scss';

import InputMask from 'react-input-mask';
import Input from '@/components/atoms/Input';
import SimpleInput from '../SimpleInput';
import Filter from '@/components/molecules/Filter';
import { fetchDataAxios } from '@/utils/fetchDataAxios';
import { formatOnlyDate } from '@/utils/formatDate';

interface Props {
  modalRegisterProject: boolean;
  setModalRegisterProject: any;
}

export default function TableProjects({ modalRegisterProject, setModalRegisterProject }: Props) {
  const [inputAll, setInputAll] = React.useState<boolean>(false)
  const [itemsSelecteds, setItemsSelecteds] = React.useState<string[]>([])
  // const [itemClicked, setItemClicked] = React.useState<string>('')

  const [showOrderFilter, setShowOrderFilter] = React.useState(false)
  const [showStatusFilter, setShowStatusFilter] = React.useState(false)
  const [showDateFilter, setShowDateFilter] = React.useState(false)
  const [showEmissorFilter, setShowEmissorFilter] = React.useState(false)

  const [projects, setProjects] = React.useState<any>([])

  const handleOnChangeInputAll = () => {
    setItemsSelecteds([])
    setInputAll(!inputAll)
  }

  const handleOnChangeOnlyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setItemsSelecteds([...itemsSelecteds, e.target.id])
    } else {
      setItemsSelecteds(itemsSelecteds.filter((item) => item != e.target.id))
    }
    // setItemClicked(e.target.id)
  }

  const handleShowAZFilter = (e: any) => {
    setShowOrderFilter(!showOrderFilter)
  }

  const handleShowStatusFilter = (e: any) => {
    setShowStatusFilter(!showStatusFilter)
  }

  const handleShowDateFilter = (e: any) => {
    setShowDateFilter(!showDateFilter)
  }

  const handleShowEmissorFilter = (e: any) => {
    setShowEmissorFilter(!showEmissorFilter)
  }

  const handleGetProjects = async () => {
    const response = await fetchDataAxios(4, setProjects)
    return response
  }

  React.useEffect(() => {
    handleGetProjects()
  }, [])

  return (
    <>
      <header className={Styles.header}>
        <div className={Styles.header__menuHeader}>
          <Button
            hidden={false}
            id='addProject'
            text='+ Novo projeto'
            label='Clique para adicionar novo projeto'
            onClick={() => setModalRegisterProject(!modalRegisterProject)}
            className={Styles.header__btnProject}
          />
          <div className={Styles.header__menuInputs}>
            <Filter
              label='Projeto'
              onClick={handleShowAZFilter}
              showOrderFilter={showOrderFilter}
            />
            <Filter
              label='Fase do Projeto'
              onClick={handleShowStatusFilter}
              showStatusFilter={showStatusFilter}
            />
            <Filter
              label='Data cadastro'
              onClick={handleShowDateFilter}
              showDateFilter={showDateFilter}
            />
            <Filter
              label='Emissor'
              onClick={handleShowEmissorFilter}
              showEmissorFilter={showEmissorFilter}
            />
          </div>
        </div>
      </header>
      <main className={Styles.main}>

        <table className={Styles.main__table}>
          <thead>
            <tr>
              <th><input
                onClick={handleOnChangeInputAll}
                checked={inputAll}
                id='inputAll'
                type='checkbox'
              />
              </th>
              <th>Projeto</th>
              <th>Fase do projeto</th>
              <th>Emissor</th>
              <th>Admin</th>
              <th>Cadastro</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project: any, index: number) => (
              <tr key={project.id}>
                <td><input
                  id={`option-${index+1}`}
                  onChange={handleOnChangeOnlyInput}
                  type='checkbox'
                  checked={inputAll || itemsSelecteds.includes(`option-${index+1}`)}
                /></td>
                <td >{project.nome}</td>
                <td>{project.faseDoProjeto}</td>
                <td>{project.emissor.nomeEmissor}</td>
                <td>Admin {index + 1}</td>
                <td>{formatOnlyDate(project.dataLancamento)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  )
}