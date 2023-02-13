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
import { fetchDataAxios } from '@/utils/fetchDataAxios';

function MobileModal() {
  const [projects, setProjects] = React.useState<any>([])
  const [projectSelected, setProjectSelected] = React.useState<any>();

  const [hiddenBuy, setHiddenBuy] = React.useState<boolean>(false);
  const [hiddenBuyCoinLivre, setHiddenBuyCoinLivre] = React.useState<boolean>(false);
  const [conditionalBuy, setConditionalBuy] = React.useState<string>('');
  const [realValue, setRealValue] = React.useState<string>('');

  const { loggedIn } = React.useContext(UserContext)

  const {
    modalMobileControl: [, setShowMobileModal]
  } = React.useContext(ModalContext)

  React.useEffect(() => {
    fetchDataAxios("4", setProjects)
    // fetchData(setProjects)
  }, [])

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

          {hiddenBuyCoinLivre ? <BuyCoinLivreMobile conditionalBuy={conditionalBuy} /> : ''}
          <HeaderModalMobile />
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
                  id={`${item.acronimo}-${i + 1}`}
                  label='Clique para comprar'
                  className={Styles.buttonStyle}
                  onClick={(e: any) => {
                    e.preventDefault();
                    if (e.target.id) {
                      setConditionalBuy(e.target.id)
                    }
                    setRealValue('')
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