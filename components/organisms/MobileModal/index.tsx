import React, { useEffect } from 'react';
import HeaderModalMobile from '../HeaderModalMobile';
import Styles from './styles.module.scss';
import InvestCardMobile from '@/molecules/InvestCardMobile';

import Logo from '@/assets/img/logo.png'
import { fetchData } from '@/utils/fetchData';
import FooterMobileModal from '../FooterMobileModal';
import CloseButton from '@/components/atoms/CloseButton';
import ModalContext from '@/context/ModalContext';

import BuyProjectMobile from '../BuyProjectMobile';
import BuyCoinLivreMobile from '../BuyCoinLivreMobile';
import UserContext from '@/context/UserContext';
import InvestCard from '@/components/molecules/InvestCard';
import Projecard from '@/components/molecules/Projecard';
import { fetchDataAxios, fetchDataUserInfo } from '@/utils/fetchDataAxios';
import { useRouter } from 'next/router';


// languages
import en from '@/public/locales/en/common.json';
import pt from '@/public/locales/pt/common.json';

interface ModalProps {
  projectSelectedProps: any;
  loteProps: any;
  valorTokenProps: string;
}

function MobileModal({ projectSelectedProps, loteProps, valorTokenProps }: ModalProps) {
  const [projects, setProjects] = React.useState<any>([])
  const [projectSelected, setProjectSelected] = React.useState<any>(projectSelectedProps);
  

  const [hiddenBuy, setHiddenBuy] = React.useState<boolean>(true);
  const [hiddenBuyCoinLivre, setHiddenBuyCoinLivre] = React.useState<boolean>(false);
  const [conditionalBuy, setConditionalBuy] = React.useState<any>('CNLT-0');
  const [realValue, setRealValue] = React.useState<string>('0');
  const [valorToken, setValorToken] = React.useState<string>(valorTokenProps)
  const [lote, setLote] = React.useState<object>(loteProps);
  const [dataUser, setDataUser] = React.useState<any>();

  const [idProject, setIdProject] = React.useState<string | null>('');

  const router = useRouter();

  const { locale } = router;

  const t = locale === 'en' ? en : pt;

  const { loggedIn } = React.useContext(UserContext)

  const {
    modalMobileControl: [, setShowMobileModal]
  } = React.useContext(ModalContext)

  React.useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    fetchDataAxios("4", setProjects)
    fetchDataUserInfo(accessToken, setDataUser, router)

    const idProject = localStorage.getItem('idProject')
    setConditionalBuy(idProject)
    setIdProject(idProject)

  }, [router])

  return (
    <>
      <main className={Styles.mainMobileModal}>
        <section className={Styles.sectionItems}>
          <div className={Styles.closeButtonDiv}>
            <CloseButton
              className={Styles.closeButton}
              onClick={(e: any) => {
                e.preventDefault()
                setShowMobileModal(false)
              }}
            />
          </div>

          {hiddenBuyCoinLivre ? <BuyCoinLivreMobile balance={dataUser?.balanceCL} conditionalBuy={conditionalBuy} /> : ''}
          <HeaderModalMobile
            balance={dataUser?.balanceCL}
          />
          {hiddenBuy ? (
            <BuyProjectMobile
              setHiddenBuy={setHiddenBuy}
              hiddenBuy={hiddenBuy}
              setConditionalBuy={setConditionalBuy}
              hiddenBuyCoinLivre={hiddenBuyCoinLivre}
              realValue={realValue}
              setHiddenBuyCoinLivre={setHiddenBuyCoinLivre}
              setRealValue={setRealValue}
              conditionalBuy={conditionalBuy}
              projectSelected={projectSelected}
              valorToken={valorToken}
              balance={dataUser?.balanceCL}
              lote={lote}
            />
          ) : (
            <section className={Styles.sectionCard}>
              <InvestCardMobile
                className={Styles.buttonStyle}
                hiddenButton={false}
                name="Token CoinLivre"
                acronimo="CNLT"
                emissor="CoinLivre"
                alt="Card CoinLivre"
                label="Comprar"
                hidden={false}
                id={`CNLT-${0}`}
                src={Logo}
                text={t.buy} 
                onClick={(e: any) => {
                  e.preventDefault()
                  if (!loggedIn[0]) {
                    // localStorage.setItem('beforePath', router.asPath)
                    return router.push('/login')
                  }
                  if (e.target.id) {
                    setConditionalBuy(e.target.id)
                  }
                  setRealValue('')
                  setConditionalBuy('CNLT-0')
                  setHiddenBuy(!hiddenBuy)
                }}
              />
              {projects.map((item: any, i: number) => (
                <InvestCardMobile
                  hiddenButton={false}
                  key={item.acronimo}
                  src={item.logoUrl}
                  alt='Esta é uma imagem de um projeto a ser exibido'
                  text={t.buy} 
                  acronimo={item.acronimo}
                  emissor={item.emissor?.nomeEmissor}
                  name={item.nome}
                  hidden={true}
                  id={item.id}
                  label='Clique para comprar'
                  className={Styles.buttonStyle}
                  onClick={(e: any) => {
                    e.preventDefault();
                    if (!loggedIn[0]) {
                      // localStorage.setItem('beforePath', router.asPath)
                      return router.push('/login')
                    }
                    if (e.target.id) {
                      setConditionalBuy(e.target.id)
                    }
                    setRealValue('0')
                    setConditionalBuy(idProject)
                    setLote(item?.lotes[item.lotes.length - 1])
                    setValorToken(item?.lotes[item.lotes.length - 1]?.valorDoToken)
                    setHiddenBuy(!hiddenBuy)
                    setProjectSelected(item)
                  }}
                />
              ))}
            </section>
          )}

        </section>
        <div className={Styles.footerStyle}>
          <FooterMobileModal />
        </div>
      </main>
    </>
  )
}

export default MobileModal;