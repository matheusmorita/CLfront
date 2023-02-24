import React from 'react'
import Image from 'next/image'
import Styles from './styles.module.scss'

import Logo from '@/assets/img/logo.png';

import Button from '@/components/atoms/Button'
import InputModal from '@/components/molecules/InputModal'
import CloseButton from '@/components/atoms/CloseButton'

import ModalContext from '@/context/ModalContext'
import HeaderModalMobile from '../HeaderModalMobile'
import QRCode from 'react-qr-code';
import { WebSocketContext } from '@/context/WebSocketContext';

import i18next from '@/src/i18n'

interface buyCoinLivreInterface {
  conditionalBuy: string;
  balance: number;
}

function BuyCoinLivreMobile({ conditionalBuy,balance }: buyCoinLivreInterface) {
  const [buyConfirmed, setBuyConfirmed] = React.useState<boolean>(false)
  const [QRcodeUrl, SetQRcodeUrl] = React.useState<any>('')
  const [languageBrowser, setLanguageBrowser] = React.useState<string>();

  React.useEffect(() => {
    const language = window.navigator.language
    setLanguageBrowser(language)
  }, []);

  const {
    modalMobileControl: [, setShowMobileModal]
  } = React.useContext(ModalContext)

  const socket = React.useContext(WebSocketContext)

  React.useEffect(() => {
    const QRcodeUrl = sessionStorage.getItem('textContent')
    const itemId = sessionStorage.getItem('itemId')
    SetQRcodeUrl(QRcodeUrl)
    socket.on('onPix', data => {
      if (data.idPix == itemId) {
        setBuyConfirmed(true)
        setTimeout(() => {
          window.location.reload()
        }, 1500);
      }
    })
  }, [])

  return (
    <div className={Styles.divBuy}>
      <section className={Styles.headerText}>
        <div className={Styles.closeButtonDiv}>
          <CloseButton
            className={Styles.closeButton}
            onClick={(e: any) => {
              e.preventDefault()
              setBuyConfirmed(false)
              setShowMobileModal(false)
            }}
          />
        </div>
        <HeaderModalMobile balance={balance} />
        {buyConfirmed ? (
          <p className={Styles.divBuy__text}>
            Obrigado pela sua compra. Dentro de alguns instantes os seus Tokens CNLT
            estarão disponíveis na sua carteira, para que você possa trocar pelos Tokens
            dos projetos que desejar. Lembre-se: você pode sacar seus CNLT a qualquer momento,
            pois 100% dos Tokens comprados tem liquidez garantida pela CoinLivre.
          </p>
        ) : (
          <p className={Styles.divBuy__text}>
            Escaneie este código com o seu celular ou use o pix copia e cola
            no app do seu banco de escolha, para realizar a sua compra de Tokens CNLT.
          </p>
        )}


      </section>
      {buyConfirmed ? (
        <Image
          width={200}
          height={200}
          alt='Imagem de QR code'
          src={Logo}
        />
      ) : (
        <div style={{ border: '2px solid #00EE8D' }}>
          <QRCode
            value={QRcodeUrl}
          />
        </div>
      )}

      <section className={Styles.qrConfirmButton}>
        <div style={{ width: '100%' }}>
          <input
            onClick={(e: any) => {
              const inputQrCode = e.target;
              inputQrCode.select();
              inputQrCode.setSelectionRange(0, 99999)
              document.execCommand("copy");
              alert('Código copiado')
            }}
            type='text'
            className={Styles.inputValue}
            value={QRcodeUrl}
            readOnly={true}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <Button
          hidden={false}
          id={'paymentQRcodeBtn'}
          label="Escaneie para efetuar o pagamento"
          onClick={() => { }}
          text={buyConfirmed ? "Sucesso" : "Aguardando"}
          disabled={true}
          className={Styles.divBuy__btnPayQrCode}
          size={25}
        />
      </section>
    </div>
  )
}

export default BuyCoinLivreMobile;