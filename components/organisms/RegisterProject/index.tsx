import React from 'react';

//assets
import Styles from './styles.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

//components
import SimpleInput from '../SimpleInput';
import DivisionBar from '@/components/atoms/Division';
import { NumericFormat } from 'react-number-format';
import GenericInputInfo from '@/components/molecules/GenericInputInfo';
import GenericInputCheckbox from '@/components/atoms/GenericInputCheckbox';
import Button from '@/components/atoms/Button';
import TableRegister from '../TableRegister';
import UploadFiles from '../UploadFiles';

export default function RegisterProject() {
  const [nameInputBackground, setNameInputBackground] = React.useState<string>('');
  const [valueInputRentability, setValueInputRentability] = React.useState<number>(0);

  const handleOnChangeInput = (e: any) => {
    const file = e.target.files[0]
    setNameInputBackground(file.name)
  }

  const notAllowNegativeNumber = (e: any) => {
    if (e.target.value < 0) {
      setValueInputRentability(0)
    } else {
      setValueInputRentability(e.target.value)
    }
  }

  return (
    <>
      <form className={Styles.mainProjectModal}>
        <section className={Styles.mainProjectModal__registerSection}>
          <h2>Cadastro de projeto</h2>

          <section className={Styles.mainProjectModal__spaceItemsRegister}>
            <div className={Styles.mainProjectModal__divItem}>
              <p className={Styles.mainProjectModal__titleInput}>Nome do projeto: </p>
              <SimpleInput
                className={Styles.projectNameInput}
                id='projectName'
                type='text'
                maxLength={25}
                required={true}
              />
              <p className={Styles.mainProjectModal__caracteresLength}>25 caracteres</p>
            </div>

            <div className={Styles.mainProjectModal__divItem}>
              <p className={Styles.mainProjectModal__titleInput}>Sigla do projeto: </p>
              <SimpleInput
                className={Styles.projectNameInput}
                id='projectSigla'
                type='text'
                maxLength={6}
                onChange={(e: any) => console.log(e.target.value.toUpperCase())}
                required={true}
              />
              <p className={Styles.mainProjectModal__caracteresLength}>6 caracteres</p>
            </div>

            <div className={Styles.mainProjectModal__divItem}>
              <div>
                <p className={Styles.mainProjectModal__titleInput}>Descrição breve: </p>
                <p className={Styles.mainProjectModal__caracteresLength}>
                  Síntese do projeto junto ao
                  background. Até 300
                  caracteres.
                </p>
              </div>
              <div className={Styles.textareaStyleDiv}>
                <textarea required maxLength={300} style={{ minHeight: '100px' }} className={Styles.textareaStyle}></textarea>
                <p className={Styles.mainProjectModal__caracteresLength}>300 caracteres</p>
              </div>
            </div>

            <div className={Styles.mainProjectModal__divItem}>
              <div>
                <p className={Styles.mainProjectModal__titleInput}>Descrição longa: </p>
                <p className={Styles.mainProjectModal__caracteresLength}>
                  Neste espaço você pode
                  trazer com mais detalhes as
                  informações sobre o token.
                  Até 1.190 caracteres.
                </p>
              </div>
              <div className={Styles.textareaStyleDiv}>
                <textarea required maxLength={1190} style={{ minHeight: '150px' }} className={Styles.textareaStyle}></textarea>
                <p className={Styles.mainProjectModal__caracteresLength}>1.190 caracteres</p>
              </div>
            </div>

            <div className={Styles.mainProjectModal__divItem}>
              <p className={Styles.mainProjectModal__titleInput}>Nome do Emissor: </p>
              <select className={Styles.projectNameInput}>
                <option style={{ color: 'black', }} selected>Nome do emissor já cadastrado</option>
                <option style={{ color: 'black' }} >Opção 2</option>
                <option style={{ color: 'black' }} >Opção 3</option>
              </select>
            </div>

            <div className={Styles.mainProjectModal__divItem}>
              <p className={Styles.mainProjectModal__titleInput}>Fase do projeto: </p>
              <select className={Styles.projectNameInput}>
                <option style={{ color: 'black', }} selected>Selecione a fase do projeto</option>
                <option style={{ color: 'black' }} >Opção 2</option>
                <option style={{ color: 'black' }} >Opção 3</option>
              </select>
            </div>

            <div className={Styles.mainProjectModal__divItem} style={{ alignItems: 'center' }}>
              <div>
                <span className={Styles.spanDescription}>Upload</span>
                <p className={Styles.mainProjectModal__titleInput}>Imagem do projeto: </p>
                <p className={Styles.mainProjectModal__caracteresLength}>
                  A resolução máxima
                  da imagem deve ser
                  de 1920x1080 pixels
                  (1080p). Tamanho
                  máximo do arquivo: 4 MB.
                </p>
              </div>
              <label htmlFor='backgroundProject' className={Styles.labelInputUploadPhoto}>
                <SimpleInput
                  type='file'
                  className=''
                  id='backgroundProject'
                  onChange={handleOnChangeInput}
                />
                <div className={Styles.sectionUploadImage}>
                  {nameInputBackground || 'Selecione o arquivo'}
                  <ArrowBackIosIcon className={Styles.arrowStyle} />
                </div>
              </label>
            </div>

            <DivisionBar
              className={Styles.divisionBar}
            />
          </section>
          <h2 style={{ margin: '2% 0' }}>Cadastro do Token</h2>
          <section className={Styles.mainProjectModal__spaceItemsRegister}>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              <strong className={Styles.titleInputRent}>Data de lançamento: </strong>
              <SimpleInput
                className={Styles.inputDate}
                id='inputDate'
                type='date'
              />
            </div>

            <div className={Styles.divRetornos}>
              <strong className={Styles.titleInputRent}>Tipo de retorno: </strong>
              <div className={Styles.retornosCheckbox}>
                <GenericInputCheckbox
                  id='inputBeneficiosCheckbox'
                  text='Retorno em benefícios'
                />
                <GenericInputCheckbox
                  id='inputRentabilidade'
                  text='Rentabilidade'
                />
              </div>
            </div>

            <div className={Styles.divRetornos}>
              <strong className={Styles.titleInputRent}>Rentabilidade estimada: </strong>
              <SimpleInput
                className={Styles.inputDate}
                id='inputRentabilidade'
                type='number'
                placeholder='X% a. a. do CDI'
                min={0}
                onChange={notAllowNegativeNumber}
              />
            </div>

            <div className={Styles.divRetornos}>
              <strong className={Styles.titleInputRent}>Quantidade de tokens: </strong>
              <NumericFormat
                className={Styles.inputDate}
                decimalSeparator=','
                thousandSeparator='.'
              />
            </div>

            <DivisionBar
              className={Styles.divisionBar}
            />
          </section>
          <h2 style={{ margin: '2% 0', textAlign: 'center' }}>Regras de benefícios / Rentabilidade e token</h2>
          <section className={Styles.mainProjectModal__spaceItemsRegister}>
            <div className={Styles.divRegraBenefits}>
              <strong className={Styles.titleInputRent}>Benefícios: </strong>
              <section style={{ display: 'flex', flexWrap: 'wrap' }}>
                <GenericInputInfo
                  id='data'
                  text='Data'
                  type='text'
                />
                <GenericInputInfo
                  id='beneficio'
                  text='Benefício'
                  type='text'
                />
                <GenericInputInfo
                  id='status'
                  text='Status'
                  type='checkbox'
                  label='Entregue'
                />
              </section>
            </div>

            <div className={Styles.divRegraBenefits}>
              <strong className={Styles.titleInputRent}>Rentabilidade: </strong>
              <section style={{ display: 'flex', flexWrap: 'wrap' }}>
                <GenericInputInfo
                  id='parcela'
                  text='Parcela'
                  type='text'
                />
                <GenericInputInfo
                  id='retorno'
                  text='Retorno'
                  type='text'
                />
                <GenericInputInfo
                  id='vencimento'
                  text='Vencimento'
                  type='text'
                />
              </section>
            </div>
          </section>
          <Button
            hidden={false}
            id='previaButton'
            label='Clique para ver a prévia'
            onClick={() => { }}
            text={'Confira a prévia antes de salvar'}
            className={Styles.buttonPrevia}
          />

          <div className={Styles.saveInfoSection}>
            <Button
              hidden={false}
              id='previaButton'
              label='Clique para ver a prévia'
              onClick={() => { }}
              text={'Salvar informações até o momento'}
              className={Styles.buttonPrevia}
            />
          </div>
        </section>

        <form className={Styles.formLotes}>
          <h2 style={{ margin: '2% 0', textAlign: 'center' }}>Lotes do projeto</h2>
          <div className={Styles.formLotes__divInputOneLote}>
            <label className={Styles.formLotes__labelCheckbox}>
              <input type='checkbox' />
              <span className={Styles.formLotes__textCheckboxLabel}>Marque esta opção caso o projeto tenha apenas um lote</span>
            </label>
            <div>
              <strong className={Styles.titleInputRent}>Valor do token (R$) </strong>
              <SimpleInput
                className={Styles.formLotes__inputText}
                id='valorDoLote'
                type='text'
              />
            </div>
          </div>

          <div className={Styles.formLotes__divInputOneLote}>
            <label className={Styles.formLotes__labelCheckbox}>
              <input type='checkbox' />
              <span className={Styles.formLotes__textCheckboxLabel}>Marque esta opção caso o projeto tenha mais de um lote</span>
            </label>
            <div>
              <TableRegister />
            </div>
          </div>
        </form>

        <UploadFiles />
      </form>
    </>
  )
}