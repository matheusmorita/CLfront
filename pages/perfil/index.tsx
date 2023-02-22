/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Head from 'next/head'
import Frame from '@/templates/Frame'
import Section from '@/components/organisms/Section'
import Column from '@/components/molecules/Column'
import Styles from './styles.module.scss'

import Row from '@/components/molecules/Row'
import Balance from '@/components/molecules/Balance'
import Switch from '@/components/molecules/Switch'
import Projecard from '@/components/molecules/Projecard'
import { fetchDataUserInfo, fetchUserHistoryinfo } from '@/utils/fetchDataAxios'
import Link from 'next/link'
import InvestCard from '@/components/molecules/InvestCard'
import { getWindowInnerWidth } from '@/assets/js/util/responsive'

const Perfil = () => {
  const [walletState, setWalletState] = React.useState(0)
  const [balance, setBalance] = React.useState<number>(0);
  const [dataUser, setDataUser] = React.useState<object>();
  const [historyUser, setHistoryUser] = React.useState<any[]>([])


  const projecardMock = [
    { title: 'Qtde.', value: 16654 },
    { title: 'Saldo', value: 0.00336569 },
    { title: 'Data', value: '28/01/2023 - 11:21' }
  ]

  const walletMock = [
    { title: 'Disponível.', value: '4.00000000' },
    { title: 'Em uso', value: 0.00336569 },
    { title: 'Total', value: '3.99663431' }
  ]

  React.useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    const widthWindow = getWindowInnerWidth()


    fetchDataUserInfo(accessToken, setBalance, setDataUser)
    fetchUserHistoryinfo(accessToken, setHistoryUser)
  }, [])

  return (
    <main>
      <Frame
        id='perfil'
        role='main'
        label='Página de cancelar assinatura'
        className={Styles.bottom}
      >
        <Head>
          <title>Perfil</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="theme-color" content="#00ee8d" />
          <meta name="robots" content="no-index, no-follow" />
          <meta name="description" content="CoinLivre | Perfil." />
        </Head>

        <Section
          id='introducao'
          label='introducao-title'
          desc='introducao-description'
          justify='center'
          hidden={false}
          className={`${Styles.intro} pt-lg-5 d-flex align-items-center pb-5`}
        >
          <Column
            media='lg'
            size={3}
            className="pt-lg-5 pt-3 d-flex align-content-center flex-wrap"
            margin='19px 0'
          >
            <div className={Styles.profile}>
              <div className={Styles.profile__header}>
                <div className={Styles.profile__background} />
                <div className={Styles.profile__picture} />
                <div className={Styles.profile__info}>
                  <span>Nome completo</span>
                  <span className={Styles.tiny}>@username</span>
                </div>
              </div>
              <div className={Styles.profile__body}>
                <ul className={Styles.actions}>
                  <a
                    className={Styles.actions__link}
                    href="mailto:faleconosco@coinlivre.com.br"
                  >
                    <li className={Styles.actions__item}>
                      Preciso de ajuda
                    </li>
                  </a>
                  <li className={Styles.actions__item}>
                    <Link
                      className={Styles.actions__link}
                      href={'/logout'}
                    >Desconectar</Link>
                  </li>
                  <li className={`${Styles.actions__item} ${Styles.danger}`}>
                    Desativar minha conta
                  </li>
                </ul>
              </div>
            </div>
          </Column>

          <Column
            media='lg'
            size={9}
            className="pt-5"
          >

            <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1%'}}>
              <Column
                media='lg'
                size={4}
                className='mb-2'
                flex='1'
                minWidth='350px'
              >
                <Balance
                  type='CoinLivre'
                  value={`CNLT ${balance}`}
                />
              </Column>
              <Column
                media='lg'
                size={4}
                className='mb-2'
                flex='1'
                minWidth='350px'
              >
                <Balance
                  type='em R$'
                  value={`R$ 0`}
                />
              </Column>
            </div>

            <div className={Styles.wallet}>
              <Switch
                setState={setWalletState}
                options={['Histórico', 'Carteira']}
              />
              <div className={Styles.wallet__body}>
                {walletState === 0 && (
                  <>
                    {historyUser?.map((item: any, i: number) => (
                      <Projecard
                        key={i}
                        data={projecardMock}
                        name={item.nomeToken}
                        montante={item.montante}
                        emissor={item.emissorProjeto}
                        acronimo={item.acronimoProjeto}
                        src={item.logoProjeto}
                      />
                    ))}
                    {/* <Projecard data={projecardMock} />
                    <Projecard data={projecardMock} />
                    <Projecard data={projecardMock} />
                    <Projecard data={projecardMock} />
                    <Projecard data={projecardMock} />
                    <Projecard data={projecardMock} /> */}
                  </>
                )}
                {walletState === 1 && (
                  <>
                    <Projecard data={walletMock} />
                    <Projecard data={walletMock} />
                    <Projecard data={walletMock} />
                    <Projecard data={walletMock} />
                    <Projecard data={walletMock} />
                    <Projecard data={walletMock} />
                  </>
                )}
              </div>
            </div>
          </Column>
        </Section>
      </Frame>
    </main>
  )
}

export default Perfil