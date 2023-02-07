import React from 'react';
import HeaderModalMobile from '../HeaderModalMobile';
import Styles from './styles.module.scss';
import InvestCardMobile from '@/organisms/InvestCardMobile';

import LogoImg from '@/assets/img/logo.webp'
import { fetchData } from '@/utils/fetchData';
import FooterMobileModal from '../FooterMobileModal';
import CloseButton from '@/components/atoms/CloseButton';
import ModalContext from '@/context/ModalContext';

import BuyProjectMobile from '../BuyProjectMobile';
import BuyCoinLivreMobile from '../BuyCoinLivreMobile';
import UserContext from '@/context/UserContext';

function MobileModal() {
  const [projects, setProjects] = React.useState<any>([])
  const [projectSelected, setProjectSelected] = React.useState<any>();

  const [hiddenBuy, SetHiddenBuy] = React.useState<boolean>(false);
  const [hiddenBuyCoinLivre, setHiddenBuyCoinLivre] = React.useState<boolean>(false);
  const [conditionalBuy, setConditionalBuy] = React.useState<string>('');
  const [realValue, setRealValue] = React.useState<string>('');

  const { loggedIn } = React.useContext(UserContext)

  const { 
    modalMobileControl: [, setShowMobileModal]
  } = React.useContext(ModalContext)

  React.useEffect(() => {
    fetchData(setProjects)
  }, [])

  return (
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

        {hiddenBuyCoinLivre ? <BuyCoinLivreMobile /> : ''}
        <HeaderModalMobile />
        {hiddenBuy ? (
          <BuyProjectMobile
          SetHiddenBuy={SetHiddenBuy}
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
          {!loggedIn[0] ? (
            <InvestCardMobile
            hiddenButton={false}
            name="Token CoinLivre"
            acronimo="CLNT"
            emissor="CoinLivre"
            alt="Card CoinLivre"
            label="Comprar"
            hidden={false}
            id={`CLNT-${0}`}
            src={LogoImg}
            text="Comprar"
            className={Styles.div}
            onClick={(e: any) => { 
              e.preventDefault()
              if (e.target.id) {
                setConditionalBuy(e.target.id)
              }
              SetHiddenBuy(!hiddenBuy)
            }}
          />
          ) : ''}
          {projects.map((item: any, i: number) => (
            <InvestCardMobile
              hiddenButton={false}
              key={item.Projeto.acronimo}
              src={item.Projeto.logo.url}
              alt='Esta é uma imagem de um projeto a ser exibido'
              text='Comprar'
              acronimo={item.Projeto.acronimo}
              emissor={item.Emissor.nome}
              name={item.Projeto.nome}
              hidden={true}
              id={`${item.Projeto.acronimo}-${i + 1}`}
              label='Clique para comprar'
              className={Styles.div}
              onClick={(e: any) => { 
                e.preventDefault();
                if (e.target.id) {
                  setConditionalBuy(e.target.id)
                }
                SetHiddenBuy(!hiddenBuy)
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
  )
}

export default MobileModal;