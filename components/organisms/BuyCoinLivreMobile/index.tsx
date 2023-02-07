import React from 'react'
import Image from 'next/image'
import Styles from './styles.module.scss'

import QRcodeImage from '@/assets/img/qrcode.webp'

import Button from '@/components/atoms/Button'
import InputModal from '@/components/molecules/InputModal'
import CloseButton from '@/components/atoms/CloseButton'

import ModalContext from '@/context/ModalContext'
import HeaderModalMobile from '../HeaderModalMobile'

function BuyCoinLivreMobile() {
  const [buyConfirmed, setBuyConfirmed] = React.useState<boolean>(false)

  
  const { 
    modalMobileControl: [, setShowMobileModal]
  } = React.useContext(ModalContext)

  return (
    <div className={Styles.divBuy}>
      <div className={Styles.closeButtonDiv}>
        <CloseButton
          className={Styles.closeButton}
          onClick={(e: any) => {
            e.preventDefault()
            setShowMobileModal(false)
          }}
        />
      </div>
      <HeaderModalMobile />
      <p className={Styles.divBuy__text}>
        Este é um texto de exemplo para ser passado alguma informação relevante relacionada
        a compra das moedas CoinLivre
        Este é um texto de exemplo para ser passado alguma informação relevante relacionada
        a compra das moedas CoinLivre
      </p>
      <Image
        width={150}
        height={150}
        alt='Imagem de QR code'
        src={QRcodeImage}
        style={{ border: '2px solid #00EE8D' }}
      />
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
        text={buyConfirmed ? "Sucesso" : "Aguardando"}
        disabled={true}
        className={Styles.divBuy__btnPayQrCode}
        size={25}
      />
    </div>
  )
}

export default BuyCoinLivreMobile;