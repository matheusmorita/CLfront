import Styles from './styles.module.scss';

import Button from "@/components/atoms/Button"
import InputModal from "@/components/molecules/InputModal"
import InvestCard from '@/components/molecules/InvestCard';
import React from 'react';
import Image from 'next/image';

import Logo from '@/assets/img/logo.png'

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



function BuyProject({
  setRealValue,
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
          Para comprar a quantidade desejada de Tokens deste projeto, você precisa antes
          comprar os Tokens CNLT, o que pode ser feito abaixo, via PIX.
          </p>
          <Image
            alt='Logo image'
            src={Logo}
            width={250}
            height={250}
          />
          {/* <p className={Styles.descriptionText}>
            Texto de exemplo para utilizar alguma descrição sobre a falta de fundos
            Texto de exemplo para utilizar alguma descrição sobre a falta de fundos
            Texto de exemplo para utilizar alguma descrição sobre a falta de fundos
            Texto de exemplo para utilizar alguma descrição sobre a falta de fundos
          </p> */}

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
                size={30}
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
                size={25}
                className={Styles.divButtons__QRButton}
              />
            )}
          </div>

        </>
      ) : (
        <>
          {conditionalBuy !== 'CLNT-0' ? (
            <div className={Styles.divInput__investCardExib}>
              <InvestCard
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
                text={buyConfirmed ? "Pagamento realizado com sucesso" : "Aguardando confirmação do pagamento"}
                disabled={true}
                className={Styles.btnPayQrCode}
                size={25}
              />
            </>
          ) : (
            <>
              {conditionalBuy !== 'CLNT-0' ? (
                <p className={Styles.descriptionText}>
                Para comprar os Tokens deste projeto, insira a quantidade de Tokens desejada. 
                Iremos calcular a quantidade de CNLTs necessária para a transação. 
                Lembre-se: a CoinLivre arcará com todo e qualquer custo de transação interna desta operação (Gas Fee).
              </p>
              ) : (
                <p className={Styles.descriptionText}>
                  Ao comprar Tokens CNLT, você receberá o equivalente 
                  em Tokens da quantia escolhida, deduzida da taxa da 
                  CoinLivre (de X%) de acordo com os seus benefícios
                </p>
              )}
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
                  size={25}
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
                    size={25}
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
                    size={25}
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

export default BuyProject;