import Styles from './styles.module.scss';

import Button from "@/components/atoms/Button"
import InputModal from "@/components/molecules/InputModal"
import InvestCard from '@/components/molecules/InvestCard';
import React from 'react';
import Image from 'next/image';

import Logo from '@/assets/img/logo.png'
import DataShow from '@/components/molecules/DataShow';
import { requestBuyToken } from '@/utils/fetchDataAxios';

import i18next from '@/src/i18n';
import Loader from '@/components/atoms/Loader';

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
  fetchRequestPix: any;
  requestPixValue: string;
  setRequestPixValue: any;
  valorToken: string;
  balance: number;
  lote: any;
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
  setProjectSelected,
  fetchRequestPix,
  requestPixValue,
  setRequestPixValue,
  valorToken,
  balance,
  lote
}: BuyProjectInterface) {
  const [hiddenBuyProject, setHiddenBuyProject] = React.useState<boolean>(false);
  const [buyConfirmed, setBuyConfirmed] = React.useState<boolean>(false);
  const [valueSaldo, setValueSaldo] = React.useState<boolean>(false);
  const [btnCheckBalance, setBtnCheckBalance] = React.useState<string>('');
  const [checkboxCheck, setCheckoxCheck] = React.useState<boolean>(false);
  const [accessTokenState, setAccessTokenState] = React.useState<any>('');
  const [hashConfirm, setHashConfirm] = React.useState<string>('')
  const [languageBrowser, setLanguageBrowser] = React.useState<string>();
  const [waiting, setWaiting] = React.useState<boolean>(false)

  const checkSaldo = (balance: number, valorToken: string, realValue: string): boolean => {
    const multiplyValues = Number(realValue) * Number(valorToken)
    if (balance >= multiplyValues) {
      return true
    }
    return false
  }

  const calcValueResponse = (realValue: string, valorToken: string) => {
    const response = (parseFloat(realValue) * parseFloat(valorToken)).toFixed(2).toString()
    const responseReplaced = response.replace('.', ',')
    return responseReplaced
  }


  React.useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    setAccessTokenState(accessToken)

    const language = window.navigator.language
    setLanguageBrowser(language)
  }, [])

  return (
    <div className={Styles.divInput}>
      {waiting ? <Loader absolute={true} active={waiting} /> : ''}
      {(!valueSaldo && btnCheckBalance === 'continueBuyProject') ? (
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
              text={languageBrowser !== 'pt-BR' ? i18next.t("Voltar") : "Voltar"}
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
                text={languageBrowser !== 'pt-BR' ? i18next.t("Gerar QR code") : "Gerar QR code"}
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
                  setHiddenBuy(!hiddenBuy)
                }}
                text={languageBrowser !== 'pt-BR' ? i18next.t("Continuar") : "Continuar"}
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
                emissor={projectSelected.emissor?.nomeEmissor}
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
              <div style={{ width: '90%' }}>
                {buyConfirmed ? (
                  <InputModal
                    id='inputQrcode'
                    type='string'
                    label='Código de confirmação'
                    disabled={false}
                    placeholder={hashConfirm}
                    className={Styles.inputValueBuyProject}
                  />
                ) : ''}
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
                  CoinLivre de 1,5% de acordo com os seus benefícios
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
                      const newStr = e.target.value.replace(/[.]/g, '')
                      const altStr = newStr.replace(',', '.')
                      setRealValue(altStr)
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
                      const strNotRs = e.target.value.replace('R$ ', '')
                      const newStr = strNotRs.replace(/[.]/g, '')
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
                  value={conditionalBuy === 'CNLT-0' ? realValue : calcValueResponse(realValue, valorToken)}
                />
              </div>
              {conditionalBuy !== 'CNLT-0' ? (
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
                  </label>
                </div>
              ) : (
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
              )}
              <div className={Styles.divButtons}>
                <Button
                  hidden={false}
                  id="backButton"
                  label="Clique para voltar"
                  onClick={() => { setHiddenBuy(!hiddenBuy) }}
                  text={languageBrowser !== 'pt-BR' ? i18next.t("Voltar") : "Voltar"}
                  size={25}
                  className={Styles.divButtons__backButton}
                />
                {conditionalBuy === 'CNLT-0' ? (
                  <>
                    <Button
                      hidden={false}
                      type='submit'
                      id="generateQRButton"
                      label="Clique para gerar QR code"
                      onClick={async (e: React.FormEvent<EventTarget>) => {
                        e.preventDefault()
                        const { itemId, textContent } = await fetchRequestPix(accessTokenState, realValue, setWaiting)
                        sessionStorage.setItem('textContent', textContent)
                        sessionStorage.setItem('itemId', itemId)
                        setHiddenBuy(true)
                        setHiddenBuyCoinLivre(!hiddenBuyCoinLivre)
                      }}
                      disabled={!checkboxCheck || (realValue === '')}
                      text={languageBrowser !== 'pt-BR' ? i18next.t("Gerar QR code") : "Gerar QR code"}
                      size={25}
                      className={Styles.divButtons__QRButton}
                    />
                  </>
                ) : (
                  <Button
                    hidden={false}
                    type='submit'
                    id="continueBuyProject"
                    label="Clique para continuar compra"
                    disabled={!checkboxCheck || (realValue === '')}
                    onClick={async (e: any) => {
                      e.preventDefault()
                      const responseSaldo = checkSaldo(balance, valorToken, realValue)
                      setValueSaldo(responseSaldo)
                      if (responseSaldo) {
                        const { confirm, hash } = await requestBuyToken(accessTokenState, realValue, lote.id, setWaiting)
                        setHashConfirm(hash)
                        if (confirm != 0) {
                          setBuyConfirmed(!buyConfirmed)
                          // setTimeout(() => {
                          //   setBuyConfirmed(!buyConfirmed)
                          //   window.location.reload()
                          // }, 2000);
                        }
                      }
                      setHiddenBuyProject(!hiddenBuyProject)
                      setBtnCheckBalance(e.target.id)
                      // setHiddenBuy(!hiddenBuy)
                    }}
                    text={languageBrowser !== 'pt-BR' ? i18next.t("Continuar") : "Continuar"}
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