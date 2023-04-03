import Button from '@/components/atoms/Button';
import React from 'react';
import { NumericFormat } from 'react-number-format';
import Styles from './styles.module.scss';

interface Props {
  addLote?: boolean;
  setAddLote?: any;
  setArrayLotes?: any;
}

export default function ConditionalAddInput({ addLote, setAddLote, setArrayLotes }: Props) {
  const [qtdLote, setQtdLote] = React.useState<string>('');
  const [launchDate, setLaunchDate] = React.useState<string>('');
  const [finishDate, setFinishDate] = React.useState<string>('');
  const [tokenValue, setTokenValue] = React.useState<string>('');
  const [qtdTokens, setQtdTokens] = React.useState<string>('');

  const handleSaveInfo = (e: any) => {
    e.preventDefault();
    setArrayLotes((items: any) => [...items, {
      qtdLote,
      launchDate,
      finishDate,
      tokenValue,
      qtdTokens
    }])
    setAddLote(!addLote)
  }

  return (
    <tr>
      <td className={Styles.table__td}>
        <NumericFormat
          allowNegative={false}
          thousandSeparator='.'
          decimalSeparator=','
          decimalScale={2}
          fixedDecimalScale={true}
          type='text'
          id='inputQtdLote'
          className={Styles.table__inputText}
          onChange={(e: any) => setQtdLote(e.target.value)}
        />
      </td>

      <td className={Styles.table__td}>
        <input
          type='date'
          id='inputLaunchDate'
          className={Styles.table__inputText}
          onChange={(e: any) => setLaunchDate(e.target.value)}
        />
      </td>

      <td className={Styles.table__td}>
        <input
          type='date'
          id='inputFinishDate'
          className={Styles.table__inputText}
          onChange={(e: any) => setFinishDate(e.target.value)}
        />
      </td>

      <td className={Styles.table__td}>
        <NumericFormat
          allowNegative={false}
          thousandSeparator='.'
          decimalSeparator=','
          decimalScale={2}
          fixedDecimalScale={true}
          type='text'
          id='inputTokenValue'
          className={Styles.table__inputText}
          onChange={(e: any) => setTokenValue(e.target.value)}
        />
      </td>

      <td className={Styles.table__td}>
        <NumericFormat
          allowNegative={false}
          thousandSeparator='.'
          decimalSeparator=','
          decimalScale={2}
          fixedDecimalScale={true}
          type='text'
          id='inputTokenLote'
          className={Styles.table__inputText}
          onChange={(e: any) => setQtdTokens(e.target.value)}
        />
      </td>

      <td className={Styles.table__td}>
        <Button
          hidden={false}
          id='saveButton'
          label='Clique para salvar o lote'
          onClick={handleSaveInfo}
          text='Salvar'
        />
      </td>
    </tr>
  )
}