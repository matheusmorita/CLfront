import Styles from './styles.module.scss';

import Button from "@/components/atoms/Button"
import InputModal from "@/components/molecules/InputModal"

interface BuyProjectInterface {
  setRealValue: any;
  realValue: string;
  SetHiddenBuy: any;
  hiddenBuy: boolean;
  setHiddenBuyCoinLivre: any;
  hiddenBuyCoinLivre: boolean;
}

function BuyProject({
  setRealValue,
  realValue,
  SetHiddenBuy,
  hiddenBuy,
  setHiddenBuyCoinLivre,
  hiddenBuyCoinLivre,
}: BuyProjectInterface) {
  return (
    <div className={Styles.divInput}>
      <p className={Styles.descriptionText}>Este é um texto de exemplo para dar descrição do projeto</p>
      <InputModal
        id="inputReal"
        label="Insira o valor em reais"
        placeholder="0000,00"
        className={Styles.inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setRealValue(e.target.value)
        }}
      />
      <InputModal
        id="inputMoedaSelecionada"
        label="Você receberá em CLNT"
        placeholder="0000,00"
        className={Styles.inputValue}
        disabled={true}
        value={realValue}
      />

      <div className={Styles.checkboxLabel}>
        <input
          id="checkboxInput"
          type="checkbox"
          className={Styles.checkboxInput}

        />
        <label
          htmlFor="checkboxInput"
          className={Styles.descriptionText}
        >
          Você concorda com os termos de uso da plataforma e está ciente dos usos das
          ferramentas incorporados nessa aplicação?
        </label>
      </div>
      <div className={Styles.divButtons}>
        <Button
          hidden={false}
          id="backButton"
          label="Clique para voltar"
          onClick={() => { SetHiddenBuy(!hiddenBuy) }}
          text="Voltar"
          size={25}
          className={Styles.divButtons__backButton}
        />
        <Button
          hidden={false}
          id="generateQRButton"
          label="Clique para gerar QR code"
          onClick={(e: React.FormEvent<EventTarget>) => {
            e.preventDefault()
            SetHiddenBuy(!hiddenBuy)
            setHiddenBuyCoinLivre(!hiddenBuyCoinLivre)
          }}
          text="Gerar QR Code"
          size={25}
          className={Styles.divButtons__QRButton}
        />
      </div>
    </div>
  )
}

export default BuyProject;