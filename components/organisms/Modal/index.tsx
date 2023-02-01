import React from "react";
import Styles from './styles.module.scss';

import HeaderModal from "@/components/molecules/HeaderModal";
import InvestCard from "@/components/molecules/InvestCard";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import InputModal from "@/components/molecules/InputModal";

function Modal() {
  const test = ['1', '1', '1', '1', '1', '1', '1', '1']
  const [hidden, SetHidden] = React.useState<boolean>(false);

  return (
    <>
      <form className={Styles.form}>
        <HeaderModal />
        {hidden ? (
          <div className={Styles.divInput}>
            <p className={Styles.descriptionText}>Este é um texto de exemplo para dar descrição do projeto</p>
            {/* <Input
              id="valorInvestido"
              label="Insira o valor em reais"
              type="number"
              required={true}
              className={Styles.inputValores}
            />
            <Input
              id="valorConvertido"
              label="Você receberá em CLNT"
              type="number"
              required={true}
              className={Styles.inputValores}
            /> */}
            
            <InputModal
              id="inputReal"
              label="Insira o valor em reais"
              onChange={(e: any) => {
                console.log(e.target.value)
              }}
            />
            <InputModal
              id="inputMoedaSelecionada"
              label="Você receberá em CLNT"
              disabled={true}
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
                Você concorda com os termos de uso da plataforma e está ciente dos usos das ferramentas incorporados nessa aplicação?
              </label>
            </div>
            <div className={Styles.divButtons}>
              <Button
                hidden={false}
                id="backButton"
                label="Clique para voltar"
                onClick={() => { SetHidden(!hidden) }}
                text="Voltar"
                size={25}
                className={Styles.backButton}
              />
              <Button
                hidden={false}
                id="generateQRButton"
                label="Clique para gerar QR code"
                onClick={() => { }}
                text="Gerar QR Code"
                size={25}
              />
            </div>
          </div>
        ) : (
          <>
            <section className={Styles.sectionCard}>
              {test.map((item, i) => (
                <InvestCard
                  key={item}
                  text='Comprar'
                  hidden={true}
                  id={`${item} - ${i}`}
                  label='Clique para comprar'
                  onClick={() => { SetHidden(!hidden) }}
                />
              ))}
            </section>
          </>
        )}
      </form>

    </>
  )
}

export default Modal;