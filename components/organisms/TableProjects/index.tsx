import Button from '@/components/atoms/Button';
import React from 'react';

import Styles from './styles.module.scss';

import InputMask from 'react-input-mask';
import Input from '@/components/atoms/Input';
import SimpleInput from '../SimpleInput';

export default function TableProjects() {
  const [inputAll, setInputAll] = React.useState<boolean>(false)
  const [itemsSelecteds, setItemsSelecteds] = React.useState<string[]>([])
  // const [itemClicked, setItemClicked] = React.useState<string>('')

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
  return (
    <>
      <main className={Styles.main}>
        <header className={Styles.main__header}>
          <div className={Styles.main__menuHeader}>
            <Button
              hidden={false}
              id='addProject'
              text='+ Novo projeto'
              label='Clique para adicionar novo projeto'
              onClick={() => { }}
              className={Styles.main__btnProject}
            />
            <div className={Styles.main__menuInputs}>
              <SimpleInput
                id='findProject'
                className={Styles.main__input}
                placeholder='Projeto'
                type='text'
              />
              <SimpleInput
                id='projectPhase'
                className={Styles.main__input}
                placeholder='Fase do projeto'
                type='text'
              />
              <SimpleInput
                id='registerDate'
                className={Styles.main__input}
                placeholder='Data de cadastro'
                type='text'
              />
              <SimpleInput
                id='projectOwner'
                className={Styles.main__input}
                placeholder='emissor'
                type='text'
              />
            </div>
          </div>
        </header>
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
            <tr>
              <td><input
                id='option-1'
                onChange={handleOnChangeOnlyInput}
                type='checkbox'
                checked={inputAll || itemsSelecteds.includes('option-1')}
              /></td>
              <td>Dado 1A</td>
              <td>Dado 1B</td>
              <td>Dado 1C</td>
              <td>Dado 1D</td>
              <td>Dado 1E</td>
            </tr>
            <tr>
              <td><input
                id='option-2'
                onChange={handleOnChangeOnlyInput}
                type='checkbox'
                checked={inputAll || itemsSelecteds.includes('option-2')}
              /></td>
              <td>Dado 2A</td>
              <td>Dado 2B</td>
              <td>Dado 2C</td>
              <td>Dado 2D</td>
              <td>Dado 2E</td>
            </tr>
            <tr>
              <td><input
                id='option-3'
                onChange={handleOnChangeOnlyInput}
                type='checkbox'
                checked={inputAll || itemsSelecteds.includes('option-3')}
              /></td>
              <td>Dado 3A</td>
              <td>Dado 3B</td>
              <td>Dado 3C</td>
              <td>Dado 3D</td>
              <td>Dado 3E</td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  )
}