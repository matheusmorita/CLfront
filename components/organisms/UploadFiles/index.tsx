import React from 'react';
import SimpleInput from '../SimpleInput';
import Styles from './styles.module.scss';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Document from './Document';

export default function UploadFiles() {
  return (
    <form className={Styles.mainFormDoc}>
      <h2 style={{ margin: '2% 0', textAlign: 'center' }}>Upload Documentos</h2>

      <div className={Styles.mainFormDoc__inputDocSection}>
        <div className={Styles.mainFormDoc__labelDescription}>
          <label htmlFor='documents' className={Styles.mainFormDoc__labelInputUploadPhoto}>
            <SimpleInput
              type='file'
              className=''
              id='documents'
            // onChange={handleOnChangeInput}
            />
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
          <Document
            text='Documento'
          />
          <Document
            text='Documento'
          />
          <Document
            text='Documento'
          />
          <Document
            text='Documento'
          />
          <Document
            text='Documento'
          />
          <Document
            text='Documento'
          />
          <Document
            text='Documento'
          />
          <Document
            text='Documento'
          />
          <Document
            text='Documento'
          />
        </section>
      </div>

    </form>
  )
}