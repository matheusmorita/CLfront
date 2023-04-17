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
import CloseIcon from '@mui/icons-material/Close';
import InputMask from 'react-input-mask';

//utils
import { verifyBeforeDate } from '@/utils/verifyBeforeDate';
import { dispatchErrorNotification, dispatchSuccessNotification } from '@/utils/dispatchNotifications';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Document from '../UploadFiles/Document';
import { fetchDataIdAxios, fetchDataIdAxiosWithFunction, getEmissor, updateProject, uploadBackgroundProject, uploadDataFormCreateProject, uploadDocumentsProject } from '@/utils/fetchDataAxios';
import FormLotes from '../FormLotes';
import { toast } from 'react-toastify';
import Loader from '@/components/atoms/Loader';
import { formatOnlyDate, formatOnlyDateTimeStamp } from '@/utils/formatDate';


//contexts

interface Props {
  modalRegisterProject: boolean;
  setModalRegisterProject: any;
  editRegister: string;
}


export default function RegisterProject({ modalRegisterProject, setModalRegisterProject, editRegister }: Props) {

  //Estados de dados Input
  const [projectName, setProjectName] = React.useState();
  const [typeToken, setTypeToken] = React.useState();
  const [siglaName, setSiglaName] = React.useState();
  const [descriptionBreve, setDescriptionBreve] = React.useState<string>();
  const [descriptionLonga, setDescriptionLonga] = React.useState<string>();
  const [checkboxRentabilidade, setCheckboxRentabilidade] = React.useState(false);
  const [checkboxBenefit, setCheckboxBenefit] = React.useState(false);
  const [nameInputBackground, setNameInputBackground] = React.useState<string>('');
  const [fileInputBackground, setFileInputBackground] = React.useState();
  const [fileInputBackgroundURL, setFileInputBackgroundURL] = React.useState<string>();
  const [launchDate, setLaunchDate] = React.useState();
  const [valueInputRentability, setValueInputRentability] = React.useState<string>();
  const [qtdTokens, setQtdTokens] = React.useState();
  const [dateBenefit, setDateBenefit] = React.useState();
  const [benefitName, setBenefitName] = React.useState();
  const [benefitStatus, setBenefitStatus] = React.useState('Não entregue');
  const [parcela, setParcela] = React.useState();
  const [returnBenefit, setReturnBenefit] = React.useState();
  const [dateVenc, setDateVenc] = React.useState();
  const [optionPhaseProject, setOptionPhaseProject] = React.useState();
  const [tokenValue, setTokenValue] = React.useState();
  const [numberLote, setNumberLote] = React.useState();
  const [onlyProject, setOnlyProject] = React.useState<any>();
  const [emissores, setEmissores] = React.useState<any[]>();

  const [statusCodeFormData, setStatusCodeFormData] = React.useState<number>();
  const [waiting, setWaiting] = React.useState<boolean>(false)

  const [allowSendFiles, setAllowSendFiles] = React.useState<boolean>(true);
  const [files, setFiles] = React.useState<any[]>([]);

  let filesNameArray: any = [];



  //router Next
  const router = useRouter();
  const { locale } = router

  // const handleCheckButtonSubmmitAble = () => {
  //   return !projectName || !siglaName || !descriptionBreve || !descriptionLonga
  // }



  const handleChangeCheckboxBenefit = (e: any) => {
    if (e.target.checked) {
      setCheckboxBenefit(true)
    } else {
      setCheckboxBenefit(false)
    }
  }

  const handleOnChangeInputFile = (e: any) => {
    const file = e.target.files[0]


    setFileInputBackground(file)
    setNameInputBackground(file?.name)
    setFileInputBackgroundURL(URL.createObjectURL(file))
  }

  const notAllowNegativeNumber = (e: any) => {
    if (parseFloat((e.target.value).replace(',', '.')) < 0) {
      setValueInputRentability('0')
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

  const handleCheckboxRent = (e: any) => {
    if (e.target.checked) {
      setCheckboxRentabilidade(true)
    } else {
      setValueInputRentability('')
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

  const handleChangeValueOptionSelected = (e: any) => {
    setOptionPhaseProject(e.target.value)
  }

  const handleSendInfoForm = async (data: any) => {
    const accessToken = localStorage.getItem('accessToken');


    const { responseID } = await uploadDataFormCreateProject(data, accessToken, setWaiting)
    await uploadBackgroundProject(responseID, fileInputBackground, accessToken)
    const responseStatusCode = await uploadDocumentsProject(responseID, files, accessToken)

    if (responseStatusCode === 200) {
      dispatchSuccessNotification(toast, 'O projeto foi criado com sucesso! Esta página irá recarregar em instantes.', true)
      setAllowSendFiles(false)
    }
  }

  const handleSendInfoUpdate = async (data: any) => {
    const accessToken = localStorage.getItem('accessToken');

    const projectIdUpdate = sessionStorage.getItem('projectUpdateId')
    const projectIdParsed = JSON.parse(projectIdUpdate!)

    await updateProject(projectIdParsed, data)
    await uploadBackgroundProject(projectIdParsed, fileInputBackground, accessToken)
    const responseStatusCode = await uploadDocumentsProject(projectIdParsed, files, accessToken)

    console.log('statusCodeDocuments ' + responseStatusCode)
    if (responseStatusCode === 200) {
      dispatchSuccessNotification(toast, 'O projeto foi atualizado com sucesso! Esta página irá recarregar em instantes.', true)
      setAllowSendFiles(false)
    }
  }

  const handleShowCaracters = (length: number, description: string) => {
    if (description) {
      return length - description!?.length
    }
    return length
  }

  const handleSaveInfoPreview = (data: any) => {
    const infoPreview = JSON.stringify(data)

    sessionStorage.setItem('infoPreview', infoPreview)
  }

  const redirectPreview = () => {
    window.open('/preview/project', '_blank')
  }

  const handleSetValueEdit = (
    nome: any,
    acronimo: any,
    tipoToken: any,
    dataLancamento: any,
    descricaoBreve: any,
    descricaoLonga: any,
    rentabilidade: any,
    faseDoProjeto: any
  ) => {
    setProjectName(nome)
    setSiglaName(acronimo)
    setTypeToken(tipoToken)
    setLaunchDate(dataLancamento)
    setDescriptionBreve(descricaoBreve)
    setDescriptionLonga(descricaoLonga)
    setValueInputRentability(rentabilidade)
    setOptionPhaseProject(faseDoProjeto)
  }

  const handleSetValueStatus = (faseDoProjeto: any) => {
    const select: any = document.getElementById('statusOptions')

    for (let i = 0; i < select.length; i++) {
      if (faseDoProjeto === select[i].value) {
        select[i].selected = true
        setOptionPhaseProject(faseDoProjeto)
      }
    }
  }

  const handleGetEmissores = async () => {
    setEmissores(await getEmissor(4))
  }


  React.useEffect(() => {
    if (!editRegister) {
      const projectIdUpdate = sessionStorage.getItem('projectUpdateId')
      const projectIdParsed = JSON.parse(projectIdUpdate!)

      const handleFetchProjectId = async (id: string, setProject: any, handleSetValue: any) => {
        const faseDoProjeto = await fetchDataIdAxiosWithFunction(id, setProject, handleSetValue)
        handleSetValueStatus(faseDoProjeto)
      }
      handleFetchProjectId(projectIdParsed, setOnlyProject, handleSetValueEdit)
    }
    handleGetEmissores()
  }, [editRegister])

  return (
    <>
      {waiting ? <Loader absolute={true} active={waiting} /> : ''}
      <form className={Styles.mainProjectModal}>
        <section className={Styles.mainProjectModal__registerSection}>
          <span className={Styles.mainProjectModal__closeModalButton}>
            <CloseIcon
              className={Styles.closeButtonIcon}
              onClick={handleCloseModalRegister}
            />
          </span>
          <h2>{editRegister ? 'Cadastro de projeto' : 'Editar projeto'} </h2>

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
                value={projectName}
              />
              <p className={projectName === '' ? Styles.caracteresLengthError : Styles.mainProjectModal__caracteresLength}>25 caracteres</p>
            </div>

            <div className={Styles.mainProjectModal__divItem}>
              <p className={Styles.mainProjectModal__titleInput}>Tipo de token*: </p>
              <SimpleInput
                className={projectName === '' ? Styles.inputError : Styles.projectNameInput}
                id='projectName'
                type='text'
                maxLength={10}
                required={true}
                placeholder='Energia'
                onChange={(e: any) => setTypeToken(e.target.value)}
                value={typeToken}
              />
              <p className={projectName === '' ? Styles.caracteresLengthError : Styles.mainProjectModal__caracteresLength}>10 caracteres</p>
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
                value={siglaName}
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
                  value={descriptionBreve}
                ></textarea>
                <p className={descriptionBreve === '' ? Styles.caracteresLengthError : Styles.mainProjectModal__caracteresLength}>{handleShowCaracters(300, descriptionBreve!)} caracteres</p>
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
                  value={descriptionLonga}
                ></textarea>
                <p className={descriptionLonga === '' ? Styles.caracteresLengthError : Styles.mainProjectModal__caracteresLength}>{handleShowCaracters(1190, descriptionLonga!)} caracteres</p>
              </div>
            </div>

            <div className={Styles.mainProjectModal__divItem}>
              <p className={Styles.mainProjectModal__titleInput}>Nome do Emissor*: </p>



              <select className={Styles.projectNameInput}>
                <option style={{ color: '#404040', }} selected>Nome do emissor já cadastrado</option>
                {emissores?.map((emissor: any, i: any) => (
                  <option key={emissor.nomeEmissor + i} style={{ color: '#404040' }} >{emissor.nomeEmissor}</option>
                ))}
              </select>
            </div>

            <div className={Styles.mainProjectModal__divItem}>
              <p className={Styles.mainProjectModal__titleInput}>Fase do projeto*: </p>
              <select id='statusOptions' onChange={handleChangeValueOptionSelected} className={Styles.projectNameInput}>
                <option value='' style={{ color: '#404040', }} selected>Selecione a fase do projeto</option>
                <option value={'Em breve'} style={{ color: '#404040' }} >Em breve</option>
                <option value={'Rodada vip'} style={{ color: '#404040' }} >Rodada vip</option>
                <option value={'Em captação'} style={{ color: '#404040' }} >Em captação</option>
                <option value={'Em implementação'} style={{ color: '#404040' }} >Em implementação</option>
                <option value={'Ativo'} style={{ color: '#404040' }} >Ativo</option>

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
                    accept='.jpg, .jpeg, .png'
                    max={4096}
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
              {/* <SimpleInput
                id='inputDate'
                type='date'
                onChange={handleCheckDate}
                maxLength={2}
                value={'2024-25-02'}
              /> */}
              <InputMask
                className={Styles.inputDate}
                mask={'99/99/9999'}
                maskChar=''
                onChange={(e: any) => setLaunchDate(e.currentTarget.value)}
                value={launchDate}
              />
            </div>

            <div className={Styles.divRetornos}>
              <strong className={Styles.titleInputRent}>Tipo de retorno: </strong>
              <div className={Styles.retornosCheckbox}>
                <GenericInputCheckbox
                  id='inputBeneficiosCheckbox'
                  text='Retorno em benefícios'
                  onChange={handleChangeCheckboxBenefit}
                />
                <GenericInputCheckbox
                  id='inputRentabilidade'
                  text='Rentabilidade'
                  checked={checkboxRentabilidade}
                  onChange={handleCheckboxRent}
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
                // decimalScale={2}
                // fixedDecimalScale={true}
                className={Styles.inputDate}
                id='inputRentabilidade'
                placeholder='X% a. a. do CDI'
                min={0}
                onChange={notAllowNegativeNumber}
                disabled={!checkboxRentabilidade}
                value={valueInputRentability}
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

            <div className={Styles.divRetornos}>
              <strong className={Styles.titleInputRent}>Valor do token: </strong>
              <NumericFormat
                className={Styles.inputDate}
                thousandSeparator='.'
                fixedDecimalScale={true}
                decimalScale={2}
                decimalSeparator=','
                onChange={(e: any) => setTokenValue(e.target.value)}
                prefix='R$'
              />
            </div>

            <div className={Styles.divRetornos}>
              <strong className={Styles.titleInputRent}>Número do lote: </strong>
              <NumericFormat
                className={Styles.inputDate}
                decimalSeparator=','
                thousandSeparator='.'
                onChange={(e: any) => setNumberLote(e.target.value)}
              />
            </div>

            <DivisionBar
              className={Styles.divisionBar}
            />
          </section>
          <h2 style={{ margin: '2% 0', textAlign: 'center' }}>Regras de benefícios e de Rentabilidade</h2>
          <section className={Styles.mainProjectModal__spaceItemsRegister}>
            <div className={Styles.divRegraBenefits}>
              <strong className={checkboxBenefit ? Styles.titleInputRent : Styles.titleInputRentDisabled}>Benefícios: </strong>
              <section style={{ display: 'flex', flexWrap: 'wrap' }}>
                <GenericInputInfo
                  id='data'
                  text='Data'
                  type='date'
                  onChange={handleDateBenefit}
                  disabled={!checkboxBenefit}
                />
                <GenericInputInfo
                  id='beneficio'
                  text='Benefício'
                  type='text'
                  onChange={handleNameBenefit}
                  disabled={!checkboxBenefit}
                />
                <GenericInputInfo
                  id='status'
                  text='Status'
                  type='checkbox'
                  label='Entregue'
                  onChange={handleBenefitStatus}
                  disabled={!checkboxBenefit}
                />
              </section>
            </div>

            <div className={Styles.divRegraBenefits}>
              <strong className={checkboxRentabilidade ? Styles.titleInputRent : Styles.titleInputRentDisabled}>Rentabilidade: </strong>
              <section style={{ display: 'flex', flexWrap: 'wrap' }}>
                <GenericInputInfo
                  id='parcela'
                  text='Parcela'
                  type='text'
                  onChange={handleParcela}
                  placeholder='2/12'
                  disabled={!checkboxRentabilidade}
                />
                <GenericInputInfo
                  id='retorno'
                  text='Retorno'
                  type='number'
                  onChange={handleReturnBenefit}
                  placeholder='R$5.000,00'
                  disabled={!checkboxRentabilidade}
                />
                <GenericInputInfo
                  id='vencimento'
                  text='Vencimento'
                  type='date'
                  onChange={handleDateVenc}
                  disabled={!checkboxRentabilidade}
                />
              </section>
            </div>
            <DivisionBar
              className={Styles.divisionBar}
            />
          </section>
          <section style={{ width: '100%', padding: '0 10%' }}>
            <UploadFiles
              allowSendFiles={allowSendFiles}
              files={files}
              setFiles={setFiles}
            />
            <DivisionBar
              className={Styles.divisionBar}
            />
          </section>

          <Button
            hidden={false}
            id='previaButton'
            label='Clique para ver a prévia'
            onClick={(e: any) => {
              e.preventDefault();
              // files.forEach(file => {
              //   filesNameArray.push(file[0].name)
              // })
              // sessionStorage.setItem('documentsName', JSON.stringify(filesNameArray))
              let arrayNameFiles = []
              for (let i = 0; i < files.length; i++) {
                arrayNameFiles.push(files[i].name)
              }
              sessionStorage.setItem('documentsName', JSON.stringify(arrayNameFiles))
              handleSaveInfoPreview({
                nome: projectName,
                acronimo: siglaName,
                tipoToken: typeToken,
                descricaoBreve: descriptionBreve,
                descricaoLonga: descriptionLonga,
                dataLancamento: launchDate,
                prazoDoLote: dateVenc,
                backgroundURL: fileInputBackgroundURL,
                rentabilidade: valueInputRentability,
                qtdTokens: qtdTokens,
                tokenValue,
                numberLote,
                benefit: checkboxBenefit,
                dateBenefit,
                benefitName,
                benefitStatus,
              })
              // setInfoProject()
              redirectPreview()
            }}
            text={'Confira a prévia antes de salvar'}
            className={Styles.buttonPrevia}
            disabled={(files.length > 9 || files.length === 0) || waiting || (!projectName || !siglaName || !typeToken || !descriptionBreve || !descriptionLonga || !nameInputBackground || !optionPhaseProject || !qtdTokens || (!checkboxBenefit && !checkboxRentabilidade) || !numberLote || !tokenValue || (checkboxRentabilidade && !valueInputRentability))}
          />

          <div className={Styles.saveInfoSection}>
            {files.length > 9 && (
              <span style={{ color: 'red' }}>Você não pode enviar mais de 9 documentos</span>
            )}
            <Button
              hidden={false}
              type='button'
              id='saveInfoForm'
              label='Clique para salvar informações'
              onClick={() => {
                dispatchSuccessNotification(toast, 'Aguarde alguns instantes, o envio do formulário pode levar até 1 min.', false)
                if (editRegister) {
                  return handleSendInfoForm({
                    nome: projectName,
                    tipoToken: typeToken,
                    faseDoProjeto: optionPhaseProject,
                    descricao: descriptionLonga,
                    resumo: descriptionBreve,
                    rentabilidade: valueInputRentability,
                    nomeToken: projectName,
                    emissorId: '48822baa-3d4f-4c84-b059-02e1542f64ce',
                    acronimo: siglaName,
                    // numeroLote: numberLote
                    // background: fileInputBackground,
                    // logo: fileInputBackground,
                    // files,
                    // lotes: [{
                    //   qtdeDeTokens: qtdTokens,
                    //   valorDoToken: tokenValue,
                    //   dataLancamento: formatOnlyDateTimeStamp(launchDate),
                    //   prazoDoLote: formatOnlyDateTimeStamp(dateVenc),
                    // }]
                  })
                } else {
                  return handleSendInfoUpdate({
                    nome: projectName,
                    descricao: descriptionLonga,
                    resumo: descriptionBreve,
                    rentabilidade: valueInputRentability,
                    nomeToken: projectName,
                    contratoToken: "string",
                    acronimo: siglaName
                  })
                }


              }}
              text={'Salvar informações do projeto'}
              // || !dateBenefit || !benefitName || !parcela || !returnBenefit || !dateVenc || !typeToken
              className={Styles.buttonSaveInfo}
              disabled={(files.length > 9 || files.length === 0) || waiting || (!projectName || !siglaName || !typeToken || !descriptionBreve || !descriptionLonga || !nameInputBackground || !optionPhaseProject || !qtdTokens || (!checkboxBenefit && !checkboxRentabilidade) || !numberLote || !tokenValue || (checkboxRentabilidade && !valueInputRentability))}
            />
          </div>
        </section>

        {/* <FormLotes /> */}


      </form>
    </>
  )
}