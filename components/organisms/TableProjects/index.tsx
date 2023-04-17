import Button from '@/components/atoms/Button';
import React, { Dispatch, MouseEvent, SetStateAction } from 'react';

import Styles from './styles.module.scss';

import InputMask from 'react-input-mask';
import Input from '@/components/atoms/Input';
import SimpleInput from '../SimpleInput';
import Filter from '@/components/molecules/Filter';
import { deleteProject, fetchDataAxios, getProjectsUnlimited } from '@/utils/fetchDataAxios';
import { formatOnlyDate } from '@/utils/formatDate';

//Icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { toast } from 'react-toastify';
import { dispatchSuccessNotification } from '@/utils/dispatchNotifications';
import { fetchDataIdAxios } from '@/utils/fetchDataAxios';



interface Props {
  modalRegisterProject: boolean;
  setModalRegisterProject: any;
  setEditRegister: any;
  setOnlyProject: any;
}

export default function TableProjects({ modalRegisterProject, setModalRegisterProject, setEditRegister, setOnlyProject }: Props) {
  const [inputAll, setInputAll] = React.useState<boolean>(false)
  const [itemsSelecteds, setItemsSelecteds] = React.useState<string[]>([])
  const [itemClicked, setItemClicked] = React.useState<string>('')
  // const [clickedButton, setClickedButton] = React.useState<string>()

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
    setShowStatusFilter(false)
    setShowDateFilter(false)
    setShowEmissorFilter(false)
  }

  const handleShowStatusFilter = (e: any) => {
    setShowStatusFilter(!showStatusFilter)
    setShowOrderFilter(false)
    setShowDateFilter(false)
    setShowEmissorFilter(false)
  }

  const handleShowDateFilter = (e: any) => {
    setShowDateFilter(!showDateFilter)
    setShowOrderFilter(false)
    setShowStatusFilter(false)
    setShowEmissorFilter(false)
  }

  const handleShowEmissorFilter = (e: any) => {
    setShowEmissorFilter(!showEmissorFilter)
    setShowOrderFilter(false)
    setShowStatusFilter(false)
    setShowDateFilter(false)
  }

  const handleGetProjects = async () => {
    return await getProjectsUnlimited(setProjects)
  }

  const handleGetElementById = (id: string) => {
    const deleteButton = document.getElementById(id)
    setItemClicked(deleteButton!.id)
  }

  const handleSetIdUpdate = (id: string) => {
    sessionStorage.setItem('projectUpdateId', JSON.stringify(id))
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
            onClick={() => {
              setEditRegister(true)
              setModalRegisterProject(!modalRegisterProject)
            }}
            className={Styles.header__btnProject}
          />
          <div className={Styles.header__menuInputs}>
            <Filter
              id='projeto'
              label='Projeto'
              onClick={handleShowAZFilter}
              showOrderFilter={showOrderFilter}
            />
            <Filter
              id='fase'
              label='Fase do Projeto'
              onClick={handleShowStatusFilter}
              showStatusFilter={showStatusFilter}
            />
            <Filter
              id='data'
              label='Data cadastro'
              onClick={handleShowDateFilter}
              showDateFilter={showDateFilter}
            />
            <Filter
              id='emissor'
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
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project: any, index: number) => (
              <tr key={project.id}>
                <td><input
                  id={`option-${index + 1}`}
                  onChange={handleOnChangeOnlyInput}
                  type='checkbox'
                  checked={inputAll || itemsSelecteds.includes(`option-${index + 1}`)}
                /></td>
                <td >{project.nome}</td>
                <td>{project.faseDoProjeto}</td>
                <td>{project.emissor.nomeEmissor}</td>
                <td>Admin {index + 1}</td>
                <td>{formatOnlyDate(project.dataLancamento)}</td>
                <td>
                  <button
                    className={Styles.main__editButton}
                    id={project.id}
                    onClick={(e: any) => {
                      e.preventDefault()
                      setEditRegister(false)
                      setModalRegisterProject(!modalRegisterProject)
                      handleSetIdUpdate(e.currentTarget.id)
                    }}
                  >
                    <AiFillEdit
                      id={project.id}
                      className={Styles.main__editIcon}
                      size={25}
                      onClick={(e: any) => {
                        e.preventDefault()
                        setEditRegister(false)
                        setModalRegisterProject(!modalRegisterProject)
                        handleSetIdUpdate(e.currentTarget.id)
                      }}
                    />
                  </button>
                </td>
                <td>
                  <button
                    className={project.id === itemClicked ? Styles.main__deleteButtonClicked : Styles.main__deleteButton}
                    id={project.id}
                    onClick={async (e: any) => {
                      e.preventDefault()
                      handleGetElementById(e.currentTarget.id)
                    }}
                  >
                    {project.id === itemClicked ? (
                      <>
                        <span
                          style={{ fontWeight: '500' }}
                          onClick={async (e: any) => {
                            e.preventDefault()
                            setItemClicked('')
                            const status = await deleteProject(itemClicked)
                            if (status === 200) {
                              dispatchSuccessNotification(toast, 'Projeto deletado com sucesso! A página irá recarregar.', true)
                            }
                            setTimeout(() => {
                              location.reload()
                            }, 3000);
                          }}
                        >Confirmar?</span>
                      </>
                    ) : (
                      <AiFillDelete
                        className={Styles.main__deleteIcon}
                        size={25}
                        id={project.id}
                        onClick={async (e: any) => {
                          e.preventDefault()
                          handleGetElementById(e.currentTarget.id)
                        }}
                      />
                    )}
                  </button>
                  {project.id === itemClicked && (
                    <span
                      className={Styles.main__deleteButtonClicked}
                      style={{ background: '#00EE8D', fontWeight: '500', cursor: 'pointer' }}
                      onClick={() => setItemClicked('')}
                    >
                      X
                    </span>
                  )}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  )
}