import Styles from './styles.module.scss';

import Button from "@/components/atoms/Button"
import InputModal from "@/components/molecules/InputModal"
import InvestCard from '@/components/molecules/InvestCard';
import React from 'react';
import Image from 'next/image';

import Logo from '@/assets/img/logo.png'
import DataShow from '@/components/molecules/DataShow';

import * as mask from '@/assets/js/util/masks';
import axios from 'axios';

interface BuyProjectInterface {
  setRealValue: any;
  realValue: string;
  setHiddenBuy: any;
  hiddenBuy: boolean;
  setHiddenBuyCoinLivre: any;
  hiddenBuyCoinLivre: boolean;
  setConditionalBuy: any;
  conditionalBuy: string;
  projectSelected: any;
  setProjectSelected: any;
}



function BuyProject({
  setRealValue,
  realValue,
  setHiddenBuy,
  hiddenBuy,
  setHiddenBuyCoinLivre,
  hiddenBuyCoinLivre,
  setConditionalBuy,
  conditionalBuy,
  projectSelected,
  setProjectSelected
}: BuyProjectInterface) {
  const [hiddenBuyProject, setHiddenBuyProject] = React.useState<boolean>(false);
  const [buyConfirmed, setBuyConfirmed] = React.useState<boolean>(false);
  const [valueSaldo, setValueSaldo] = React.useState<boolean>(true);
  const [btnCheckBalance, setBtnCheckBalance] = React.useState<string>('');
  const [checkboxCheck, setCheckoxCheck] = React.useState<boolean>(false);

  const saldo = 20;

  const checkSaldo = () => {
    if (saldo < 10) {
      return setValueSaldo(false)
    }
    return setValueSaldo(true)
  }

  const requestPix = () => {
    axios.post('https://coinlivre.blocklize.io/token/criar-ordem-pix', {
      quantity: realValue,
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMwZjdiNGZjLTgwM2EtNDlmYi1hOGI2LTAzZmQyYjhkYjc5ZiIsImlhdCI6MTY3NjA2NTEzMCwiZXhwIjoxNjc2MDY4NzMwfQ.CjObyGDEVTevhsqnCLtLd9lmPuoq3tdQ3Zi6cM-IM08'
    }).then(response => console.log(response))
  }

  return (
    <div className={Styles.divInput}>
      {(valueSaldo === false && btnCheckBalance === 'continueBuyProject') ? (
        <section className={Styles.notEnoughCoins}>
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

          <div className={Styles.divButtons}>
            <Button
              hidden={false}
              id="backButton"
              label="Clique para voltar"
              onClick={() => {
                setHiddenBuy(!hiddenBuy)
              }}
              text="Voltei"
              size={25}
              className={Styles.divButtons__backButton}
            />
            {conditionalBuy === 'CNLT-0' ? (
              <Button
                hidden={false}
                id="generateQRButton"
                label="Clique para gerar QR code"
                onClick={(e: React.FormEvent<EventTarget>) => {
                  e.preventDefault()
                  setHiddenBuy(!hiddenBuy)
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
                  setHiddenBuy(hiddenBuy)
                }}
                text="Continuar compra"
                size={25}
                className={Styles.divButtons__QRButton}
              />
            )}
          </div>

        </section>
      ) : (
        <>
          {conditionalBuy !== 'CNLT-0' ? (
            <div className={Styles.divInput__investCardExib}>
              <InvestCard
                hiddenButton={true}
                acronimo={projectSelected.acronimo}
                alt='Esta é uma imagem de um projeto a ser exibido'
                emissor={projectSelected.emissor.nomeEmissor}
                id={projectSelected.acronimo}
                name={projectSelected.nome}
                src={projectSelected.logoUrl}
                className={Styles.div}
              />
            </div>
          ) : ''}
          {hiddenBuyProject ? (
            <>
              <p className={Styles.descriptionText}>
                Muito obrigado por investir neste projeto. Seus Tokens estarão na sua carteira
                em alguns instantes e poderão ser visualizados na aba Histórico,
                além de contabilizarem no seu Saldo.
              </p>
              <Image
                width={200}
                height={200}
                alt='Imagem de QR code'
                src={Logo}
              />
              <div style={{width: '90%'}}>
              <InputModal
                id='inputQrcode'
                type='string'
                label='Código de confirmação'
                disabled={false}
                placeholder='kashdlasjldhasldasd5asd4c54sac4as4dasa5a4sd54'
                className={Styles.inputValueBuyProject}
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
              </div>
            </>
          ) : (
            <>
              {conditionalBuy !== 'CNLT-0' ? (
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
              <div className={Styles.InputsGroupStyle}>
                {conditionalBuy !== 'CNLT-0' ? (
                  <InputModal
                    id="inputQtdTokens"
                    type='number'
                    prefix=''
                    label={"Escolha a quantidade de Tokens"}
                    placeholder="0"
                    className={Styles.inputValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const newStr = e.target.value.replace(/[^0-9]/g, '')
                      setRealValue(newStr)
                    }}
                  />
                ) : (
                  <InputModal
                    id="inputReal"
                    type='number'
                    prefix='R$ '
                    label={conditionalBuy !== 'CNLT-0' ? "Escolha a quantidade de Tokens" : "Insira o valor em reais"}
                    placeholder='R$ 0,00'
                    className={Styles.inputValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const newStr = e.target.value.replace(/[^0-9]/g, '')
                      setRealValue(newStr)
                    }}
                  />
                )}
                <InputModal
                  id="inputMoedaSelecionada"
                  type='string'
                  prefix='CNLT '
                  label={conditionalBuy !== 'CNLT-0' ? "Valor final" : "Você receberá em CNLT"}
                  placeholder='CNLT 0,00'
                  className={Styles.inputValue}
                  disabled={true}
                  value={(Number(realValue) * 2).toString()}
                />
              </div>

              <div className={Styles.checkboxLabel}>
                <input
                  id="checkboxInput"
                  onClick={() => setCheckoxCheck(!checkboxCheck)}
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
                  size={25}
                  className={Styles.divButtons__backButton}
                />
                {conditionalBuy === 'CNLT-0' ? (
                  <Button
                    hidden={false}
                    type='submit'
                    id="generateQRButton"
                    label="Clique para gerar QR code"
                    onClick={async (e: React.FormEvent<EventTarget>) => {
                      e.preventDefault()
                      await requestPix()
                      setHiddenBuy(true)
                      setHiddenBuyCoinLivre(!hiddenBuyCoinLivre)
                    }}
                    disabled={!checkboxCheck || (realValue === '')}
                    text="Gerar QR Code"
                    size={25}
                    className={Styles.divButtons__QRButton}
                  />
                ) : (
                  <Button
                    hidden={false}
                    type='submit'
                    id="continueBuyProject"
                    label="Clique para continuar compra"
                    disabled={!checkboxCheck || (realValue === '')}
                    onClick={(e: any) => {
                      e.preventDefault()
                      setHiddenBuyProject(!hiddenBuyProject)
                      checkSaldo()
                      setBtnCheckBalance(e.target.id)
                      // setHiddenBuy(!hiddenBuy)
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