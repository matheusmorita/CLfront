import Button from '@/components/atoms/Button';
import React from 'react';
import Styles from './styles.module.scss';

//assets
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConditionalAddInput from './ConditionalAddInput';

export default function TableRegister() {
  const [addLote, setAddLote] = React.useState<boolean>(false);
  const [arrayLotes, setArrayLotes] = React.useState<any[]>([])

  const handleChangeAddLote = (e: any) => {
    e.preventDefault();
    setAddLote(!addLote)
  }

  const handleDeleteItem = (e: any) => {
    e.preventDefault();

    const arrayFiltred = arrayLotes.filter((_, index: number) => e.target.id == index)

    setArrayLotes(arrayFiltred)
  }

  return (
    <>
      <table className={Styles.table}>
        <thead>
          <tr>
            <th className={Styles.table__th}>Quantidade de lotes</th>
            <th className={Styles.table__th}>Data de início</th>
            <th className={Styles.table__th}>Data de término</th>
            <th className={Styles.table__th}>Valor do token (R$)</th>
            <th className={Styles.table__th}>Token por lote</th>
            <th className={Styles.table__th}></th>
            <th className={Styles.table__th}></th>
          </tr>
        </thead>
        <tbody>
          {arrayLotes.map((item, index) => {
            return (
                <tr key={`ordem-${index}`}>
                  <td className={Styles.table__td}>{item.qtdLote}</td>
                  <td className={Styles.table__td}>{item.launchDate}</td>
                  <td className={Styles.table__td}>{item.finishDate}</td>
                  <td className={Styles.table__td}>{item.tokenValue}</td>
                  <td className={Styles.table__td}>{item.qtdTokens}</td>
                  <td className={Styles.table__td}>
                    <button
                      className={Styles.table__editButton}
                      onClick={(e: any) => { 
                        e.preventDefault()
                        console.log(e.target.id)
                      }}
                      id={`${index}`}
                    >
                      <EditIcon
                        className={Styles.table__editButtonIcon}
                        id={`${index}`}
                      />
                    </button>
                  </td>
                  <td className={Styles.table__td}>
                    <button
                      className={Styles.table__editButton}
                      onClick={handleDeleteItem}
                      id={`${index}`}
                    >
                      <DeleteIcon
                        className={Styles.table__deleteButtonIcon}
                        id={`${index}`}
                      />
                    </button>
                  </td>
                </tr>
            )
          })}


          {addLote && (
            <ConditionalAddInput
            addLote={addLote}
            setAddLote={setAddLote}
            setArrayLotes={setArrayLotes}
            />
          )}
        </tbody>
      </table>
      <Button
        hidden={false}
        id='addLote'
        label='Clique para adicionar um lote'
        onClick={handleChangeAddLote}
        text='Adicionar lote'
        className={Styles.buttonAddLote}
      />
    </>
  )
}