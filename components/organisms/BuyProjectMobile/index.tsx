import React from 'react';

import Button from "@/components/atoms/Button"

import Styles from './styles.module.scss';

import Image from "next/image"
import Logo from '@/assets/img/logo.webp'
import InputModal from '@/components/molecules/InputModal';
import InvestCardMobile from '../InvestCardMobile';


interface BuyProjectInterface {
  setRealValue: any;
  realValue: string;
  SetHiddenBuy: any;
  hiddenBuy: boolean;
  setHiddenBuyCoinLivre: any;
  hiddenBuyCoinLivre: boolean;
  conditionalBuy: string;
  projectSelected: any;
}

function BuyProjectMobile({ setRealValue,
  realValue,
  SetHiddenBuy,
  hiddenBuy,
  setHiddenBuyCoinLivre,
  hiddenBuyCoinLivre,
  conditionalBuy,
  projectSelected,
}: BuyProjectInterface) {
  const [hiddenBuyProject, setHiddenBuyProject] = React.useState<boolean>(false);
  const [buyConfirmed, setBuyConfirmed] = React.useState<boolean>(false);
  const [valueSaldo, setValueSaldo] = React.useState<boolean>(true);

  const saldo = 2;

  const checkSaldo = () => {
    if (saldo < 10) {
      return setValueSaldo(false)
    }
    return setValueSaldo(true)
  }

  return (
    <div className={Styles.divInput}>
      {valueSaldo === false ? (
        <>
          <h4 className={Styles.titleEnough}>Fundos insuficientes</h4>
          <p className={Styles.descriptionText}>
            Texto de exemplo para utilizar alguma descrição sobre a falta de fundos
          </p>
          <Image
            alt='Logo image'
            src={Logo}
          />
          <p className={Styles.descriptionText}>
            Texto de exemplo para utilizar alguma descrição sobre a falta de fundos
            Texto de exemplo para utilizar alguma descrição sobre a falta de fundos
            Texto de exemplo para utilizar alguma descrição sobre a falta de fundos
            Texto de exemplo para utilizar alguma descrição sobre a falta de fundos
          </p>

          <div className={Styles.divButtons}>
            <Button
              hidden={false}
              id="backButton"
              label="Clique para voltar"
              onClick={() => { SetHiddenBuy(!hiddenBuy) }}
              text="Voltar"
              size={20}
              className={Styles.divButtons__backButton}
            />
            {conditionalBuy === 'CLNT-0' ? (
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
                size={20}
                className={Styles.divButtons__QRButton}
              />
            ) : (
              <Button
                hidden={false}
                id="continueBuyProject"
                label="Clique para continuar compra"
                onClick={(e: React.FormEvent<EventTarget>) => {
                  e.preventDefault()
                  SetHiddenBuy(!hiddenBuy)
                  setHiddenBuyCoinLivre(!hiddenBuyCoinLivre)
                }}
                text="Continuar"
                size={20}
                className={Styles.divButtons__QRButton}
              />
            )}
          </div>

        </>
      ) : (
        <>
          {conditionalBuy !== 'CLNT-0' ? (
            <div className={Styles.divInput__investCardExib}>
              <InvestCardMobile
                hiddenButton={true}
                acronimo={projectSelected.Projeto.acronimo}
                alt='Esta é uma imagem de um projeto a ser exibido'
                emissor={projectSelected.Emissor.nome}
                id={projectSelected.Projeto.acronimo}
                name={projectSelected.Projeto.nome}
                src={projectSelected.Projeto.logo.url}
                className={Styles.div}
              />
            </div>
          ) : ''}
          {hiddenBuyProject ? (
            <>
              <p className={Styles.descriptionText}>
                Este é um texto de exemplo para dar descrição do projeto
                Este é um texto de exemplo para dar descrição do projeto
                Este é um texto de exemplo para dar descrição do projeto
                Este é um texto de exemplo para dar descrição do projeto
              </p>
              <Image
                width={150}
                height={150}
                alt='Imagem de QR code'
                src={Logo}
                style={{ border: '2px solid #00EE8D' }}
              />
              <InputModal
                id='inputQrcode'
                label='Clique para copiar o código'
                disabled={false}
                placeholder='kashdlasjldhasldasd5asd4c54sac4as4dasa5a4sd54'
                className={Styles.inputValueBuyProject}
                classNameLabel={Styles.labelValue}
              />
              <Button
                hidden={false}
                id={'paymentQRcodeBtn'}
                label="Escaneie para efetuar o pagamento"
                onClick={() => { }}
                text={buyConfirmed ? "Sucesso" : "Aguardando"}
                disabled={true}
                className={Styles.btnPayQrCode}
                size={20}
              />
            </>
          ) : (
            <>
              <p className={Styles.descriptionText}>
              Ao comprar Tokens CNLT, você receberá o equivalente 
              em Tokens da quantia escolhida, deduzida da taxa da CoinLivre (de X%) 
              de acordo com os seus benefícios
              </p>
              <InputModal
                id="inputReal"
                label={conditionalBuy !== 'CLNT-0' ? "Escolha a quantidade de Tokens" : "Insira o valor em reais"}
                placeholder="0000,00"
                className={Styles.inputValue}
                classNameLabel={Styles.labelValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setRealValue(e.target.value)
                }}
              />
              <InputModal
                id="inputMoedaSelecionada"
                label={conditionalBuy !== 'CLNT-0' ? "Valor final" : "Você receberá em CLNT"}
                placeholder="0000,00"
                className={Styles.inputValue}
                classNameLabel={Styles.labelValue}
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
                  className={Styles.descriptionTextCheckbox}
                >
                  Eu concordo com os termos de uso e política de privacidade da CoinLivre.
                  Estou ciente de que a conta de origem do depósito deve estar no meu nome e CPF.
                </label>
              </div>
              <div className={Styles.divButtons}>
                <Button
                  hidden={false}
                  id="backButton"
                  label="Clique para voltar"
                  onClick={() => { SetHiddenBuy(!hiddenBuy) }}
                  text="Voltar"
                  size={20}
                  className={Styles.divButtons__backButton}
                />
                {conditionalBuy === 'CLNT-0' ? (
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
                    size={20}
                    className={Styles.divButtons__QRButton}
                  />
                ) : (
                  <Button
                    hidden={false}
                    id="continueBuyProject"
                    label="Clique para continuar compra"
                    onClick={(e: React.FormEvent<EventTarget>) => {
                      e.preventDefault()
                      setHiddenBuyProject(!hiddenBuyProject)
                      checkSaldo()
                      // SetHiddenBuy(!hiddenBuy)
                    }}
                    text="Continuar"
                    size={20}
                    className={Styles.divButtons__QRButton}
                  />
                )}
              </div>
            </>
          )}
        </>
      )}

    </div>
  )
}

export default BuyProjectMobile;