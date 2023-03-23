import React from 'react';

import Button from "@/components/atoms/Button"

import Styles from './styles.module.scss';

import Image from "next/image"
import Logo from '@/assets/img/logo.png'
import InputModal from '@/components/molecules/InputModal';
import InvestCardMobile from '@/components/molecules/InvestCardMobile';
import { fetchRequestPix, requestBuyToken } from '@/utils/fetchDataAxios';

import Loader from '@/components/atoms/Loader';

// languages
import en from '@/public/locales/en/common.json';
import pt from '@/public/locales/pt/common.json';
import { useRouter } from 'next/router';


interface BuyProjectInterface {
  setRealValue: any;
  realValue: string;
  setHiddenBuy: any;
  hiddenBuy: boolean;
  setHiddenBuyCoinLivre: any;
  hiddenBuyCoinLivre: boolean;
  conditionalBuy: string;
  projectSelected: any;
  valorToken: string;
  balance: string;
  lote: any;
  setConditionalBuy: any;
}

function BuyProjectMobile({ setRealValue,
  realValue,
  setHiddenBuy,
  hiddenBuy,
  setHiddenBuyCoinLivre,
  hiddenBuyCoinLivre,
  conditionalBuy,
  setConditionalBuy,
  projectSelected,
  valorToken,
  balance,
  lote
}: BuyProjectInterface) {
  const [hiddenBuyProject, setHiddenBuyProject] = React.useState<boolean>(false);
  const [buyConfirmed, setBuyConfirmed] = React.useState<boolean>(false);
  const [valueSaldo, setValueSaldo] = React.useState<boolean>(false);
  const [btnCheckBalance, setBtnCheckBalance] = React.useState<string>('');
  const [checkboxCheck, setCheckoxCheck] = React.useState<boolean>(false);
  const [accessTokenState, setAccessTokenState] = React.useState<string | null>('');
  const [hashConfirm, setHashConfirm] = React.useState<string>('')
  const [waiting, setWaiting] = React.useState<boolean>(false)
  const [responseCode, setResponseCode] = React.useState<number>()

  const [buyCoinlivre, setByCoinlivre] = React.useState<boolean>(false)

  const router = useRouter();
  const { locale } = router;

  const t = locale === 'en' ? en : pt

  const checkSaldo = (balance: string, valorToken: string, realValue: string): boolean => {
    const balanceNumber = parseFloat(balance.replace(',', '.'))
    const multiplyValues = Number(realValue) * Number(valorToken)
    if (balanceNumber >= multiplyValues) {
      return true
    }
    return false
  }

  const calcValueResponse = (realValue: string, valorToken: string) => {
    const response = (parseFloat(realValue) * parseFloat(valorToken)).toFixed(2).toString()
    const responseReplaced = response.replace('.', ',')
    return responseReplaced
  }

  const calcCoinlivreTax = (realValue: string) => {
    const taxaCoinlivre = 1.5/100;

    let formatedValue = realValue

    if (realValue.includes(',')) {
      formatedValue = realValue.replace(',', '.')
    }

    const result = Number(formatedValue) - taxaCoinlivre*Number(formatedValue)
    return Number(result.toFixed(2)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
  }

  React.useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    setAccessTokenState(accessToken)
  }, [])

  return (
    <div className={Styles.divInput}>
      {waiting ? <Loader absolute={true} active={waiting} /> : ''}
      {(!valueSaldo && btnCheckBalance === 'continueBuyProject') ? (
        <section className={Styles.notEnoughCoins}>
          {!buyCoinlivre ? (
            <>
              <h4 className={Styles.titleEnough}>Fundos insuficientes</h4>
              <p className={Styles.descriptionText}>
                Para comprar a quantidade desejada de Tokens deste projeto, você precisa antes
                comprar os <b style={{color: '#00EE8D'}}>Tokens Coinlivre#CNLT</b>, o que pode ser feito abaixo, via PIX.
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
                  text={t.back}
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
                    text={t.generateQrCode}
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
                      setConditionalBuy('CNLT-0')
                      setByCoinlivre(!buyCoinlivre)
                      setRealValue('0')
                      setCheckoxCheck(!checkboxCheck)
                      // setHiddenBuy(!hiddenBuy)
                    }}
                    text={t.next}
                    size={25}
                    className={Styles.divButtons__QRButton}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <p className={Styles.descriptionText}>
                Ao comprar <b style={{color: '#00EE8D'}}>Tokens Coinlivre#CNLT</b>, você receberá o equivalente
                em Tokens da quantia escolhida, deduzida da taxa da
                CoinLivre de 1,5% de acordo com os seus benefícios
              </p>
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
                    value={conditionalBuy === 'CNLT-0' ? calcCoinlivreTax(realValue) : calcValueResponse(realValue, valorToken)}
                  />
                </div>
              )}
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
                  onClick={() => {
                    setHiddenBuy(!hiddenBuy)
                  }}
                  text={t.back}
                  size={25}
                  className={Styles.divButtons__backButton}
                />
                {conditionalBuy === 'CNLT-0' ? (
                  <Button
                    hidden={false}
                    type='submit'
                    id="generateQRButton"
                    label={t.generateQrCode}
                    onClick={async (e: React.FormEvent<EventTarget>) => {
                      e.preventDefault()
                      const { itemId, textContent } = await fetchRequestPix(accessTokenState, realValue, setWaiting)
                      sessionStorage.setItem('textContent', textContent)
                      sessionStorage.setItem('itemId', itemId)
                      setHiddenBuy(true)
                      setHiddenBuyCoinLivre(!hiddenBuyCoinLivre)
                    }}
                    disabled={!checkboxCheck || realValue === '' || realValue === '0'}
                    text={t.generateQrCode}
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
                      setConditionalBuy('CNLT-0')
                      setByCoinlivre(!buyCoinlivre)
                      // setHiddenBuy(!hiddenBuy)
                    }}
                    text={t.next}
                    size={25}
                    className={Styles.divButtons__QRButton}
                  />
                )}
              </div>
              {/* <Button
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
                text={t.generateQrCode}
                size={25}
                className={Styles.divButtons__QRButton}
              /> */}
            </>
          )}

        </section>
      ) : (
        <section className={Styles.successBuyProject}>
          {hiddenBuyProject ? (
            responseCode === 500 || responseCode === 400 ? (
              <>
                <main className={Styles.buyCoinLivre}>
                  <div className={Styles.divInput__investCardExib}>
                    <InvestCardMobile
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
                  <p className={Styles.descriptionTextFailed}>
                    Houve um problema ao tentar comprar este projeto, você pode ter excedido
                    o limite máximo de captação, ou houve um erro interno no servidor,
                    por favor, tente novamente mais tarde.
                  </p>
                  <Image
                    width={200}
                    height={200}
                    alt='Imagem de QR code'
                    src={Logo}
                  />
                  <div style={{ width: '90%' }}>
                    <Button
                      hidden={false}
                      id={'paymentQRcodeBtn'}
                      label="Escaneie para efetuar o pagamento"
                      onClick={() => { setHiddenBuy(!hiddenBuy) }}
                      text={"Voltar para o início"}
                      disabled={false}
                      className={Styles.buttonBackInit}
                      size={25}
                    />
                  </div>
                </main>
              </>
            ) : (
              <main className={Styles.buyCoinLivre}>
                <div className={Styles.divInput__investCardExib}>
                  <InvestCardMobile
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
                <div className={Styles.inputCheckBuy}>
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
                    text={buyConfirmed ? "Sucesso" : "Aguardando"}
                    disabled={true}
                    className={Styles.btnPayQrCode}
                    size={20}
                  />
                </div>
              </main>
            )
          ) : (
            <main className={Styles.buyCoinLivre}>
              {conditionalBuy !== 'CNLT-0' ? (
                <>
                  <div className={Styles.divInput__investCardExib}>
                    <InvestCardMobile
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
                  <p className={Styles.descriptionText}>
                    Para comprar os Tokens deste projeto, insira a quantidade de Tokens desejada.
                    Iremos calcular a quantidade de CNLTs necessária para a transação.
                    Lembre-se: a CoinLivre arcará com todo e qualquer custo de transação interna desta operação (Gas Fee).
                  </p>
                </>
              ) : (
                <p className={Styles.descriptionText}>
                  Ao comprar <b style={{color: '#00EE8D'}}>Tokens Coinlivre#CNLT</b>, você receberá o equivalente
                  em Tokens da quantia escolhida, deduzida da taxa da CoinLivre de 1,5%
                  de acordo com os seus benefícios
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
                      console.log(realValue)
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
                  value={conditionalBuy === 'CNLT-0' ? calcCoinlivreTax(realValue) : calcValueResponse(realValue, valorToken)}
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
                  text={t.back}
                  size={20}
                  className={Styles.divButtons__backButton}
                />
                {conditionalBuy === 'CNLT-0' ? (
                  <Button
                    hidden={false}
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
                    text={t.generateQrCode}
                    size={20}
                    disabled={!checkboxCheck || realValue === '' || realValue === '0'}
                    className={Styles.divButtons__QRButton}
                  />
                ) : (
                  <Button
                    hidden={false}
                    id="continueBuyProject"
                    label="Clique para continuar compra"
                    onClick={async (e: any) => {
                      e.preventDefault()
                      const responseSaldo = checkSaldo(balance, valorToken, realValue)
                      setValueSaldo(responseSaldo)
                      if (responseSaldo) {
                        const { hash, responseStatus } = await requestBuyToken(accessTokenState, realValue, lote.id, setWaiting, setResponseCode)
                        setHashConfirm(hash)
                        if (responseStatus === 201) {
                          setBuyConfirmed(!buyConfirmed)
                          setTimeout(() => {
                            setBuyConfirmed(!buyConfirmed)
                            window.location.reload()
                          }, 5000);
                        }
                      }
                      setHiddenBuyProject(!hiddenBuyProject)
                      setBtnCheckBalance(e.target.id)
                      // setHiddenBuy(!hiddenBuy)
                    }}
                    text={t.next}
                    size={20}
                    disabled={!checkboxCheck || realValue === '' || realValue === '0'}
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