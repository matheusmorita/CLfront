import React from 'react';

//assets
import Styles from './styles.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import SimpleInput from '../SimpleInput';

export default function RegisterProject() {
  const [nameInputBackground, setNameInputBackground] = React.useState<string>('');

  const handleOnChangeInput = (e: any) => {
    const file = e.target.files[0]
    setNameInputBackground(file.name)

  }

  return (
    <>
      <form className={Styles.mainProjectModal}>
        {/* <button className={Styles.mainProjectModal__closeButton}>
                    <CloseIcon className={Styles.closeButtonIcon} />
                </button> */}
        <section className={Styles.mainProjectModal__registerSection}>
          <h2 style={{ color: 'black' }}>Cadastro de projeto</h2>

          <section className={Styles.mainProjectModal__spaceItemsRegister}>
            <div className={Styles.mainProjectModal__divItem}>
              <p className={Styles.mainProjectModal__titleInput}>Nome do projeto: </p>
              <SimpleInput
                className={Styles.projectNameInput}
                id='projectName'
                type='text'
                maxLength={25}
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
              />
              <p className={Styles.mainProjectModal__caracteresLength}>4 caracteres</p>
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
                <textarea maxLength={300} style={{ minHeight: '100px', resize: 'none' }} className={Styles.textareaStyle}></textarea>
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
                <textarea maxLength={1190} style={{ minHeight: '150px', resize: 'none' }} className={Styles.textareaStyle}></textarea>
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
              {/* <input type='file' style={{width: '200px', height: '200px', background: 'red'}} /> */}
              <label htmlFor='backgroundProject' className={Styles.projectNameInput}>
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

          </section>
        </section>
      </form>
    </>
  )
}