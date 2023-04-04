import React, { ChangeEvent, MouseEvent } from 'react';

//assets
import Styles from './styles.module.scss';
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
import { toast } from 'react-toastify'
import CloseIcon from '@mui/icons-material/Close';

//utils
import { verifyBeforeDate } from '@/utils/verifyBeforeDate';
import { dispatchErrorNotification, dispatchSuccessNotification } from '@/utils/dispatchNotifications';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Document from '../UploadFiles/Document';

interface Props {
  modalRegisterProject: boolean;
  setModalRegisterProject: any;
}


export default function RegisterProject({ modalRegisterProject, setModalRegisterProject }: Props) {

  //Estados de dados Input
  const [projectName, setProjectName] = React.useState();
  const [siglaName, setSiglaName] = React.useState();
  const [descriptionBreve, setDescriptionBreve] = React.useState();
  const [descriptionLonga, setDescriptionLonga] = React.useState();
  const [checkboxRentabilidade, setCheckboxRentabilidade] = React.useState(false);
  const [nameInputBackground, setNameInputBackground] = React.useState<string>('');
  const [launchDate, setLaunchDate] = React.useState();
  const [valueInputRentability, setValueInputRentability] = React.useState<number>(0);
  const [qtdTokens, setQtdTokens] = React.useState();
  const [dateBenefit, setDateBenefit] = React.useState();
  const [benefitName, setBenefitName] = React.useState();
  const [benefitStatus, setBenefitStatus] = React.useState('Não entregue');
  const [parcela, setParcela] = React.useState();
  const [returnBenefit, setReturnBenefit] = React.useState();
  const [dateVenc, setDateVenc] = React.useState();


  //Regras dos benefícios


  //router Next
  const router = useRouter();
  const { locale } = router

  // const handleCheckButtonSubmmitAble = () => {
  //   return !projectName || !siglaName || !descriptionBreve || !descriptionLonga
  // }

  const handleOnChangeInputFile = (e: any) => {
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

  const handleCheckDate = (e: any) => {
    // if (verifyBeforeDate(e.target.value)) {
    //   dispatchErrorNotification(toast, 'A data inserida precisa ser maior ou igual a data atual', false)
    // } else {
    //   dispatchSuccessNotification(toast, 'A data inserida está correta!', false)
    // }
    setLaunchDate(e.target.value)
  }

  const handleCheckbox = (e: any) => {
    if (e.target.checked) {
      setCheckboxRentabilidade(true)
    } else {
      setCheckboxRentabilidade(false)
    }

  }

  const handleCloseModalRegister = (e: any) => {
    e.preventDefault()
    setModalRegisterProject(!modalRegisterProject)
  }

  const handleDateBenefit = (e: any) => {
    setDateBenefit(e.target.value)
  }

  const handleNameBenefit = (e: any) => {
    setBenefitName(e.target.value)
  }

  const handleBenefitStatus = (e: any) => {
    if (e.target.checked) {
      setBenefitStatus('Entregue')
    } else {
      setBenefitStatus('Não entregue')
    }

  }

  const handleParcela = (e: any) => {
    setParcela(e.target.value)
  }

  const handleReturnBenefit = (e: any) => {
    setReturnBenefit(e.target.value)
  }

  const handleDateVenc = (e: any) => {
    setDateVenc(e.target.value)
  }



  return (
    <>
      <form className={Styles.mainProjectModal}>
        <section className={Styles.mainProjectModal__registerSection}>
          <span className={Styles.mainProjectModal__closeModalButton}>
            <CloseIcon
              className={Styles.closeButtonIcon}
              onClick={handleCloseModalRegister}
            />
          </span>
          <h2>Cadastro de projeto</h2>

          <section className={Styles.mainProjectModal__spaceItemsRegister}>
            <div className={Styles.mainProjectModal__divItem}>
              <p className={Styles.mainProjectModal__titleInput}>Nome do projeto*: </p>
              <SimpleInput
                className={projectName === '' ? Styles.inputError : Styles.projectNameInput}
                id='projectName'
                type='text'
                maxLength={25}
                required={true}
                placeholder='Nome do projeto'
                onChange={(e: any) => setProjectName(e.target.value)}
              />
              <p className={projectName === '' ? Styles.caracteresLengthError : Styles.mainProjectModal__caracteresLength}>25 caracteres</p>
            </div>

            <div className={Styles.mainProjectModal__divItem}>
              <p className={Styles.mainProjectModal__titleInput}>Sigla do projeto*: </p>
              <SimpleInput
                className={siglaName === '' ? Styles.inputError : Styles.projectNameInput}
                id='projectSigla'
                type='text'
                maxLength={6}
                onChange={(e: any) => setSiglaName(e.target.value)}
                required={true}
                placeholder='Digite somente a SIGLA sem o "#"'
              />
              <p className={siglaName === '' ? Styles.caracteresLengthError : Styles.mainProjectModal__caracteresLength}>6 caracteres</p>
            </div>

            <div className={Styles.mainProjectModal__divItem}>
              <div>
                <p className={Styles.mainProjectModal__titleInput}>Descrição breve*: </p>
                <p className={Styles.mainProjectModal__caracteresLength}>
                  Síntese do projeto junto ao
                  background. Até 300
                  caracteres.
                </p>
              </div>
              <div className={Styles.textareaStyleDiv}>
                <textarea
                  required
                  maxLength={300}
                  style={{ minHeight: '100px' }}
                  className={descriptionBreve === '' ? Styles.textareaStyleError : Styles.textareaStyle}
                  onChange={(e: any) => setDescriptionBreve(e.target.value)}
                ></textarea>
                <p className={descriptionBreve === '' ? Styles.caracteresLengthError : Styles.mainProjectModal__caracteresLength}>300 caracteres</p>
              </div>
            </div>

            <div className={Styles.mainProjectModal__divItem}>
              <div>
                <p className={Styles.mainProjectModal__titleInput}>Descrição longa*: </p>
                <p className={Styles.mainProjectModal__caracteresLength}>
                  Neste espaço você pode
                  trazer com mais detalhes as
                  informações sobre o token.
                  Até 1.190 caracteres.
                </p>
              </div>
              <div className={Styles.textareaStyleDiv}>
                <textarea
                  required
                  maxLength={1190}
                  style={{ minHeight: '150px' }}
                  className={descriptionLonga === '' ? Styles.textareaStyleError : Styles.textareaStyle}
                  onChange={(e: any) => setDescriptionLonga(e.target.value)}
                ></textarea>
                <p className={descriptionLonga === '' ? Styles.caracteresLengthError : Styles.mainProjectModal__caracteresLength}>1.190 caracteres</p>
              </div>
            </div>

            <div className={Styles.mainProjectModal__divItem}>
              <p className={Styles.mainProjectModal__titleInput}>Nome do Emissor*: </p>
              <select className={Styles.projectNameInput}>
                <option style={{ color: 'black', }} selected>Nome do emissor já cadastrado</option>
                <option style={{ color: 'black' }} >Opção 2</option>
                <option style={{ color: 'black' }} >Opção 3</option>
              </select>
            </div>

            <div className={Styles.mainProjectModal__divItem}>
              <p className={Styles.mainProjectModal__titleInput}>Fase do projeto*: </p>
              <select className={Styles.projectNameInput}>
                <option style={{ color: 'black', }} selected>Selecione a fase do projeto</option>
                <option style={{ color: 'black' }} >Opção 2</option>
                <option style={{ color: 'black' }} >Opção 3</option>
              </select>
            </div>

            <div className={Styles.mainProjectModal__divItem} style={{ alignItems: 'center' }}>
              <div>
                <span className={Styles.spanDescription}>Upload</span>
                <p className={Styles.mainProjectModal__titleInput}>Imagem do projeto*: </p>
                <p className={Styles.mainProjectModal__caracteresLength}>
                  A resolução máxima
                  da imagem deve ser
                  de 1920x1080 pixels
                  (1080p). Tamanho
                  máximo do arquivo: 4 MB.
                </p>
              </div>
              <div style={{ display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'flex-start' }}>
                <label htmlFor='backgroundProject' className={Styles.labelInputUploadPhoto}>
                  <SimpleInput
                    type='file'
                    className=''
                    id='backgroundProject'
                    onChange={handleOnChangeInputFile}
                  />
                  <div className={Styles.sectionUploadImage}>
                    {/* {nameInputBackground || 'Selecione o arquivo'} */}
                    <ArrowBackIosIcon className={Styles.arrowStyle} />
                  </div>
                </label>
                {nameInputBackground !== '' ? (
                  <Document
                    text={nameInputBackground}
                  />
                ) : ''}
              </div>
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
                onChange={handleCheckDate}
                maxLength={2}
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
                  checked={checkboxRentabilidade}
                  onChange={handleCheckbox}
                />
              </div>
            </div>

            <div className={Styles.divRetornos}>
              <strong className={checkboxRentabilidade ? Styles.titleInputRent : Styles.titleInputRentDisabled}>Rentabilidade estimada: </strong>
              {/* <SimpleInput
                className={Styles.inputDate}
                id='inputRentabilidade'
                type='number'
                placeholder='X% a. a. do CDI'
                min={0}
                onChange={notAllowNegativeNumber}
                disabled={!checkboxRentabilidade}
              /> */}
              <NumericFormat
                thousandSeparator='.'
                decimalSeparator=','
                decimalScale={2}
                fixedDecimalScale={true}
                className={Styles.inputDate}
                id='inputRentabilidade'
                placeholder='X% a. a. do CDI'
                min={0}
                onChange={notAllowNegativeNumber}
                disabled={!checkboxRentabilidade}
              />
            </div>

            <div className={Styles.divRetornos}>
              <strong className={Styles.titleInputRent}>Quantidade de tokens: </strong>
              <NumericFormat
                className={Styles.inputDate}
                decimalSeparator=','
                thousandSeparator='.'
                onChange={(e: any) => setQtdTokens(e.target.value)}
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
                  type='date'
                  onChange={handleDateBenefit}
                />
                <GenericInputInfo
                  id='beneficio'
                  text='Benefício'
                  type='text'
                  onChange={handleNameBenefit}
                />
                <GenericInputInfo
                  id='status'
                  text='Status'
                  type='checkbox'
                  label='Entregue'
                  onChange={handleBenefitStatus}
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
                  onChange={handleParcela}
                />
                <GenericInputInfo
                  id='retorno'
                  text='Retorno'
                  type='text'
                  onChange={handleReturnBenefit}
                />
                <GenericInputInfo
                  id='vencimento'
                  text='Vencimento'
                  type='date'
                  onChange={handleDateVenc}
                />
              </section>
            </div>
          </section>
          <Link
            href={'/preview/ideia'}
            locale={locale}
            className={Styles.linkStyle}
          >
            <Button
              hidden={false}
              id='previaButton'
              label='Clique para ver a prévia'
              onClick={() => { }}
              text={'Confira a prévia antes de salvar'}
              className={Styles.buttonPrevia}
            />
          </Link>

          <div className={Styles.saveInfoSection}>
            <Button
              hidden={false}
              type='submit'
              id='saveInfoForm'
              label='Clique para salvar informações'
              onClick={() => { }}
              text={'Salvar informações até o momento'}
              className={Styles.buttonSaveInfo}
              disabled={!projectName || !siglaName || !descriptionBreve || !descriptionLonga || !nameInputBackground || !launchDate}
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
            <div className={Styles.overflowStyle}>
              <TableRegister />
            </div>
          </div>
        </form>

        <UploadFiles />
      </form>
    </>
  )
}