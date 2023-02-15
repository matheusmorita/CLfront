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

function MobileModal() {
  const [projects, setProjects] = React.useState<any>([])
  const [projectSelected, setProjectSelected] = React.useState<any>();

  const [hiddenBuy, setHiddenBuy] = React.useState<boolean>(false);
  const [hiddenBuyCoinLivre, setHiddenBuyCoinLivre] = React.useState<boolean>(false);
  const [conditionalBuy, setConditionalBuy] = React.useState<string>('');
  const [realValue, setRealValue] = React.useState<string>('');
  const [balance, setBalance] = React.useState<number>(0)
  const [valorToken, setValorToken] = React.useState<string>('')
  const [lote, setLote] = React.useState<object>();



  const { loggedIn } = React.useContext(UserContext)

  const {
    modalMobileControl: [, setShowMobileModal]
  } = React.useContext(ModalContext)

  React.useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    fetchDataAxios("4", setProjects)
    fetchDataUserInfo(accessToken, setBalance)
  }, [balance])

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

          {hiddenBuyCoinLivre ? <BuyCoinLivreMobile balance={balance} conditionalBuy={conditionalBuy} /> : ''}
          <HeaderModalMobile 
            balance={balance}
          />
          {hiddenBuy ? (
            <BuyProjectMobile
              setHiddenBuy={setHiddenBuy}
              hiddenBuy={hiddenBuy}
              hiddenBuyCoinLivre={hiddenBuyCoinLivre}
              realValue={realValue}
              setHiddenBuyCoinLivre={setHiddenBuyCoinLivre}
              setRealValue={setRealValue}
              conditionalBuy={conditionalBuy}
              projectSelected={projectSelected}
              valorToken={valorToken}
              balance={balance}
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
                text="Comprar"
                onClick={(e: any) => {
                  e.preventDefault()
                  if (e.target.id) {
                    setConditionalBuy(e.target.id)
                  }
                  setRealValue('')
                  setHiddenBuy(!hiddenBuy)
                }}
              />
              {projects.map((item: any, i: number) => (
                <InvestCardMobile
                  hiddenButton={false}
                  key={item.acronimo}
                  src={item.logoUrl}
                  alt='Esta é uma imagem de um projeto a ser exibido'
                  text='Comprar'
                  acronimo={item.acronimo}
                  emissor={item.emissor.nomeEmissor}
                  name={item.nome}
                  hidden={true}
                  id={item.id}
                  label='Clique para comprar'
                  className={Styles.buttonStyle}
                  onClick={(e: any) => {
                    e.preventDefault();
                    if (e.target.id) {
                      setConditionalBuy(e.target.id)
                    }
                    setRealValue('')
                    setLote(item.lotes[item.lotes.length - 1])
                    setValorToken(item.lotes[item.lotes.length - 1].valorDoToken)
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