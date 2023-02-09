import React from 'react'
import HeaderModal from '@/components/organisms/HeaderModal'
import Image from 'next/image'
import Styles from './styles.module.scss'

import QRcodeImage from '@/assets/img/qrcode.webp'
import logo from '@/assets/img/logo.png';

import Button from '@/components/atoms/Button'
import InputModal from '@/components/molecules/InputModal'
import CloseButton from '@/components/atoms/CloseButton'

import ModalContext from '@/context/ModalContext'

function BuyCoinLivre() {
  const [buyConfirmed, setBuyConfirmed] = React.useState<boolean>(false)

  const { modalControl: [, setShowModal] } = React.useContext(ModalContext)



  return (
    <div className={Styles.divBuy}>
      <div className={Styles.closeButtonDiv}>
        <CloseButton
          className={Styles.closeButton}
          onClick={(e: any) => {
            e.preventDefault()
            setShowModal(false)
          }}
        />
      </div>
      <HeaderModal />
      {buyConfirmed ? (
        <p className={Styles.divBuy__text}>
          Obrigado pela sua compra. Dentro de alguns instantes os seus Tokens CNLT 
          estarão disponíveis na sua carteira, para que você possa trocar pelos Tokens dos 
          projetos que desejar. Lembre-se: você pode sacar seus CNLT a qualquer momento, 
          pois 100% dos Tokens comprados tem liquidez garantida pela CoinLivre. 
        </p>
      ) : (
        <p className={Styles.divBuy__text}>
          Escaneie este código com o seu celular ou use o pix 
          copia e cola no app do seu banco de escolha, para realizar a sua compra de Tokens CNLT.
        </p>
      )}
      {buyConfirmed ? (
        <Image
          width={200}
          height={200}
          alt='Logo da Coin Livre'
          src={logo}
        />
      ) : (
        <Image
          width={200}
          height={200}
          alt='Imagem de QR code'
          src={QRcodeImage}
          style={{ border: '2px solid #00EE8D' }}
        />
      )}
      <div className={Styles.buttonDivPayment}>
        <InputModal
          id='inputQrcode'
          label='Clique para copiar o código'
          disabled={true}
          placeholder='kashdlasjldhasldasd5asd4c54sac4as4dasa5a4sd54'
          className={Styles.inputValue}
          classNameLabel={Styles.labelValue}
        />
        <Button
          hidden={false}
          id={'paymentQRcodeBtn'}
          label="Escaneie para efetuar o pagamento"
          onClick={() => { }}
          text={buyConfirmed ? "Pagamento realizado com sucesso" : "Aguardando confirmação do pagamento"}
          disabled={true}
          className={Styles.divBuy__btnPayQrCode}
          size={25}
        />
      </div>
    </div>
  )
}

export default BuyCoinLivre