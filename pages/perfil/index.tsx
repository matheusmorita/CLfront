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
import { fetchDataUserInfo, fetchUserHistoryinfo, uploadBackgroundPhoto, uploadProfilePhoto } from '@/utils/fetchDataAxios'
import Link from 'next/link'
import InvestCard from '@/components/molecules/InvestCard'
import { getWindowInnerWidth } from '@/assets/js/util/responsive'

import BorderColorIcon from '@mui/icons-material/BorderColor';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';

import bg2 from '@/assets/img/BG2.webp';

import Image from 'next/image'
import { useRouter } from 'next/router'

import { formatValueBalance } from '@/utils/formatBalance'
import { changePosition } from '@/utils/changeOrderArray';

// languages
import en from '@/public/locales/en/common.json';
import pt from '@/public/locales/pt/common.json';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { useTranslation } from 'next-i18next'
import Modal from '@/components/organisms/Modal'
import MobileModal from '@/components/organisms/MobileModal'

import defaultImage from '@/assets/img/placeholder.webp'
import bgDefaultImage from '@/assets/img/BG.webp';

const Perfil = () => {
  const [walletState, setWalletState] = React.useState(0)
  const [dataUser, setDataUser] = React.useState<any>();
  const [historyUser, setHistoryUser] = React.useState<any[]>([])
  const [accessToken, setAccessToken] = React.useState<string | null>()

  // const [profileImage, setProfileImage] = React.useState<any>();

  const router = useRouter();

  const { locale } = router;

  const t = locale === 'en' ? en : pt;

  const { t: translate } = useTranslation('project');

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
    setAccessToken(accessToken)
    

    const widthWindow = getWindowInnerWidth()

    fetchDataUserInfo(accessToken, setDataUser)
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
          <title>{t.profile}</title>
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
                <label style={{position: 'absolute', right: '1%', bottom: '22%'}}  htmlFor='backgroundInputImage'>
                  <FlipCameraIosIcon className={Styles.profile__icon} />
                  <input id="backgroundInputImage" name='image' type="file" onChange={(e: any) => {
                    uploadBackgroundPhoto(e.target.files[0], accessToken)
                    setTimeout(() => {
                      router.reload()
                    }, 1500);
                  }}></input>
                </label>
                {dataUser?.imgBackgroundUrl ? (
                  <Image
                    height={150}
                    width={1000}
                    src={dataUser?.imgBackgroundUrl}
                    alt='Background Image'
                    className={Styles.profile__background}
                  />
                ) : (
                  <Image
                    height={150}
                    width={1000}
                    src={bgDefaultImage}
                    alt='Background Image'
                    className={Styles.profile__background}
                  />
                )}
                <div className={Styles.profile__picture}>
                  <label className={Styles.profile__inputImage} htmlFor='profileImageInput'>
                    <FlipCameraIosIcon className={Styles.profile__icon} />
                    <input id="profileImageInput" name='image' type="file" onChange={(e: any) => {
                      uploadProfilePhoto(e.target.files[0], accessToken)
                      setTimeout(() => {
                        router.reload()
                      }, 1500);
                    }}></input>
                  </label>

                  {dataUser?.imgPerfilUrl ? (
                     <Image
                     className={Styles.profile__picture}
                     height={100}
                     width={100}
                     alt='defaultImage'
                     src={dataUser?.imgPerfilUrl}
                   />
                  ) : (
                    <Image
                      className={Styles.profile__picture}
                      height={100}
                      width={100}
                      alt='defaultImage'
                      src={defaultImage}
                    />
                  )}
                </div>
                <div className={Styles.profile__info}>
                  <span><b>{dataUser?.nome}</b></span>
                  {/* <span className={Styles.tiny}>@username</span> */}
                </div>
              </div>
              <div className={Styles.profile__body}>
                <ul className={Styles.actions}>
                  <a
                    className={Styles.actions__link}
                    href="mailto:faleconosco@coinlivre.com.br"
                  >
                    <li className={Styles.actions__item}>
                      {t.help}
                    </li>
                  </a>
                  <li className={Styles.actions__item}>
                    <Link
                      className={Styles.actions__link}
                      href={'/logout'}
                    >{t.disconnect}</Link>
                  </li>
                  {/* <li className={`${Styles.actions__item} ${Styles.danger}`}>
                    Desativar minha conta
                  </li> */}
                </ul>
              </div>
            </div>
          </Column>

          <Column
            media='lg'
            size={9}
            className="pt-5"
          >

            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1%' }}>
              <Column
                media='lg'
                size={4}
                className='mb-2'
                flex='1'
                minWidth='350px'
              >
                <Balance
                  type='CoinLivre'
                  value={`CNLT ${dataUser?.balanceCL}`}
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
                  type='R$'
                  value={`R$ ${dataUser?.saldoReais}`}
                />
              </Column>
            </div>

            <div className={Styles.wallet}>
              <Switch
                setState={setWalletState}
                options={[t.historic, t.wallet]}
              />

              <div className={Styles.wallet__body}>
                {walletState === 0 && (
                  <>
                    {historyUser?.map((item: any, i: number) => (
                      <Projecard
                        key={item.id}
                        data={projecardMock}
                        name={item.nomeToken}
                        montante={item.montante}
                        emissor={item.emissorProjeto}
                        acronimo={item.acronimoProjeto}
                        src={item.logoProjeto}
                        date={item.criadoEm}
                        valorUnitario={item.valorUnitario}
                        tokenBalance={0}
                        idProject={item.projetoId}
                      />
                    ))}
                  </>
                )}
                {walletState === 1 && (
                  <>
                    {changePosition(dataUser?.balanceTokensCaptacao, 0)?.map((item: any, i: number) => (
                      <Projecard
                        key={`${i}-${item.acronimo}`}
                        data={projecardMock}
                        name={item.nomeToken}
                        montante={item.montante}
                        emissor={item.emissorNome}
                        acronimo={item.acronimo}
                        src={item.logoToken}
                        valorUnitario={item.valorUnitario}
                        totalValue={item.total}
                        showTotalValue={true}
                        showUnitaryValue={true}
                        idProject={item.projetoId}
                      />
                    ))}
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