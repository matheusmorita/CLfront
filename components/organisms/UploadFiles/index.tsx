import React from 'react';
import SimpleInput from '../SimpleInput';
import Styles from './styles.module.scss';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Document from './Document';
import Button from '@/components/atoms/Button';
// import { uploadDocumentsProject } from '@/utils/fetchDataAxios';
import Loader from '@/components/atoms/Loader';

import { toast } from 'react-toastify';
import { dispatchSuccessNotification } from '@/utils/dispatchNotifications';

interface Props {
  onClick?: any
  allowSendFiles?: boolean;
  files: any[];
  setFiles: any;
}

export default function UploadFiles({ onClick, allowSendFiles, setFiles, files }: Props) {
  const [waiting, setWaiting] = React.useState<boolean>(false);

  const handleChangeInputFile = (e: any) => {
    setFiles((prevState: any) => {
      if (prevState[0] == '') {
        setFiles([])
      }
      return [...prevState, e.target.files]
    });
  }

  const handleOnClickDocument = (e: any) => {
    e.preventDefault()
    const newArray = files.filter((file) => file[0]?.name != e.target.id)
    setFiles(newArray)

    
    
    if (e.target.id === '') {
      const filteredArray = files.filter(i => i.length != 0)
      setFiles(filteredArray)
    }
  }

  // const handleSendDocuments = async (data: any) => {
  //   const accessToken = localStorage.getItem('accessToken')
  //   const responseStatus = await uploadDocumentsProject(data, accessToken, setWaiting)

  //   if (responseStatus === 400) {
  //     dispatchSuccessNotification(toast, 'Houve um erro ao tentar enviar os arquivos, tente novamente mais tarde.', true)
  //   }
  // }

  return (
    <>
      {waiting ? <Loader absolute={true} active={waiting} /> : ''}
      <form className={Styles.mainFormDoc}>
        <h2 style={{ margin: '2% 0', textAlign: 'center' }}>Upload Documentos</h2>

        <div style={{alignItems: 'center'}} className={Styles.mainFormDoc__inputDocSection}>
          <div className={Styles.mainFormDoc__labelDescription}>
            <label  htmlFor='documents' className={Styles.mainFormDoc__labelInputUploadPhoto}>
              <input
                type='file'
                id='documents'
                accept='.jpg, .jpeg, .png, .pdf'
                onChange={handleChangeInputFile}
                max={10240}
              />
              {/* <SimpleInput
              type='file'
              className=''
              id='documents'
              // multiple={true}
              onChange={handleChangeInputFile}
            /> */}
              <div className={Styles.sectionUploadImage}>
                {/* {nameInputBackground || 'Selecione o arquivo'} */}
                <ArrowBackIosIcon className={Styles.mainFormDoc__arrowStyle} />
              </div>
            </label>
            <span>Você pode carregar até 9 documentos simultâneos no formato PNG, JPG e PDF.
              O tamanho máximo por documento é de 10 MB.
            </span>
          </div>

          <section className={Styles.mainFormDoc__sectionDocs}>
            {/* <button type='button' onClick={() => {console.log(files)}}>Clique aqui</button> */}
            {files.map((file: any, i: number) => (
              <Document
                key={`file-${i}`}
                text={file[0]?.name}
                allowClose={true}
                onClick={handleOnClickDocument}
                id={file[0]?.name}
              />
            ))}
          </section>
        </div>

        {/* <div className={Styles.mainFormDoc__divButtonSendDoc}>
          <Button
            type='submit'
            hidden={false}
            className={Styles.buttonSendDocs}
            id='buttonSendDocuments'
            label='Clique aqui para enviar os documentos'
            disabled={allowSendFiles}
            onClick={(e: any) => {
              e.preventDefault()
              handleSendDocuments(files)
              setFiles([])
            }}
            text='Enviar os documentos'
          />
        </div> */}

      </form>
    </>
  )
}