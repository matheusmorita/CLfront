import React from 'react';

import Button from "@/components/atoms/Button"

import Styles from './styles.module.scss';

import Image from "next/image"
import Logo from '@/assets/img/logo.png'
import InputModal from '@/components/molecules/InputModal';
import InvestCardMobile from '@/components/molecules/InvestCardMobile';


interface BuyProjectInterface {
  setRealValue: any;
  realValue: string;
  setHiddenBuy: any;
  hiddenBuy: boolean;
  setHiddenBuyCoinLivre: any;
  hiddenBuyCoinLivre: boolean;
  conditionalBuy: string;
  projectSelected: any;
}

function BuyProjectMobile({ setRealValue,
  realValue,
  setHiddenBuy,
  hiddenBuy,
  setHiddenBuyCoinLivre,
  hiddenBuyCoinLivre,
  conditionalBuy,
  projectSelected,
}: BuyProjectInterface) {
  const [hiddenBuyProject, setHiddenBuyProject] = React.useState<boolean>(false);
  const [buyConfirmed, setBuyConfirmed] = React.useState<boolean>(false);
  const [valueSaldo, setValueSaldo] = React.useState<boolean>(true);
  const [btnCheckBalance, setBtnCheckBalance] = React.useState<string>('');


  const saldo = 20;

  const checkSaldo = () => {
    if (saldo < 10) {
      return setValueSaldo(false)
    }
    return setValueSaldo(true)
  }

  return (
    <div className={Styles.divInput}>
      {(valueSaldo === false && btnCheckBalance === 'continueBuyProject') ? (
        <section className={Styles.notEnoughCoins}>
          <h4 className={Styles.titleEnough}>Fundos insuficientes</h4>
          <p className={Styles.descriptionText}>
            Para comprar a quantidade desejada de Tokens deste projeto,
            você precisa antes comprar os Tokens CNLT, o que pode ser feito abaixo, via PIX.
          </p>
          <Image
            alt='Logo image'
            src={Logo}
            width={200}
            height={200}
          />

          <div className={Styles.divButtons}>
            <Button
              hidden={false}
              id="backButton"
              label="Clique para voltar"
              onClick={() => { setHiddenBuy(!hiddenBuy) }}
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
                  setHiddenBuy(!hiddenBuy)
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
                  setHiddenBuy(!hiddenBuy)
                }}
                text="Continuar"
                size={20}
                className={Styles.divButtons__QRButton}
              />
            )}
          </div>

        </section>
      ) : (
        <section className={Styles.successBuyProject}>
          {hiddenBuyProject ? (
            <main className={Styles.buyCoinLivre}>
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
              <p className={Styles.descriptionText}>
                Muito obrigado por investir neste projeto. Seus Tokens estarão
                na sua carteira em alguns instantes e poderão ser visualizados
                na aba Histórico, além de contabilizarem no seu Saldo.
              </p>
              <Image
                width={200}
                height={200}
                alt='Imagem de QR code'
                src={Logo}
              />
              <div>
                <InputModal
                  id='inputQrcode'
                  type='string'
                  label='Clique para copiar o código'
                  disabled={false}
                  placeholder='kashdlasjldhasldasd5asd4c54sac4as4dasa5a4sd54'
                  className={Styles.inputValueBuyProject}
                />
                <Button
                  hidden={false}
                  id={'paymentQRcodeBtn'}
                  label="Escaneie para efetuar o pagamento"
                  onClick={() => { }}
                  text={"Sucesso"}
                  disabled={true}
                  className={Styles.btnPayQrCode}
                  size={20}
                />
              </div>
            </main>
          ) : (
            <main className={Styles.buyCoinLivre}>
              {conditionalBuy !== 'CLNT-0' ? (
                <>
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
                  <p className={Styles.descriptionText}>
                    Para comprar os Tokens deste projeto, insira a quantidade de Tokens desejada.
                    Iremos calcular a quantidade de CNLTs necessária para a transação.
                    Lembre-se: a CoinLivre arcará com todo e qualquer custo de transação interna desta operação (Gas Fee).
                  </p>
                </>
              ) : (
                <p className={Styles.descriptionText}>
                  Ao comprar Tokens CNLT, você receberá o equivalente
                  em Tokens da quantia escolhida, deduzida da taxa da CoinLivre (de X%)
                  de acordo com os seus benefícios
                </p>
              )}

              <InputModal
                id="inputReal"
                type='string'
                label={conditionalBuy !== 'CLNT-0' ? "Escolha a quantidade de Tokens" : "Insira o valor em reais"}
                placeholder='000.00'
                className={Styles.inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setRealValue(e.target.value)
                }}
              />
              <InputModal
                id="inputReal"
                type='string'
                label={conditionalBuy !== 'CLNT-0' ? "Valor final" : "Você receberá em CLNT"}
                placeholder='000.00'
                className={Styles.inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setRealValue(e.target.value)
                }}
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
                  onClick={() => { setHiddenBuy(!hiddenBuy) }}
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
                      setHiddenBuy(true)
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
                    onClick={(e: any) => {
                      e.preventDefault()
                      setHiddenBuyProject(!hiddenBuyProject)
                      checkSaldo()
                      setBtnCheckBalance(e.target.id)
                      // setHiddenBuy(!hiddenBuy)
                    }}
                    text="Continuar"
                    size={20}
                    className={Styles.divButtons__QRButton}
                  />
                )}
              </div>
            </main>
          )}
        </section>
      )}

    </div>
  )
}

export default BuyProjectMobile;