import HeaderModal from '@/components/molecules/HeaderModal'
import Image from 'next/image'
import Styles from './styles.module.scss'

import QRcodeImage from '@/assets/img/qrcode.webp'
import Button from '@/components/atoms/Button'
import InputModal from '@/components/molecules/InputModal'

function BuyCoinLivre () {
    return (
        <div className={Styles.divBuy}>
            <HeaderModal />
            <p className={Styles.divBuy__text}>
                Este é um texto de exemplo para ser passado alguma informação relevante relacionada
                a compra das moedas CoinLivre
                Este é um texto de exemplo para ser passado alguma informação relevante relacionada
                a compra das moedas CoinLivre
            </p>
            <Image 
                width={250}
                height={250}
                alt='Imagem de QR code'
                src={QRcodeImage}
            />
            <InputModal
                id='inputQrcode'
                label='Clique para copiar o código'
                disabled={true}
            />
            <Button
                hidden={false}
                id={'paymentQRcodeBtn'}
                label="Escaneie para efetuar o pagamento"
                onClick={() => {}}
                text="Aguardando confirmação do pagamento"
                disabled={true}
                className={Styles.divBuy__btnPayQrCode}
                size={25}
            />
        </div>
    )
}

export default BuyCoinLivre