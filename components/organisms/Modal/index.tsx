import React from "react";
import Styles from './styles.module.scss';

import HeaderModal from "@/components/organisms/HeaderModal";
import InvestCard from "@/components/molecules/InvestCard";
import BuyCoinLivre from "../buyCoinLivre";

import CloseButton from "@/components/atoms/CloseButton";

import LogoImg from '@/assets/img/logo.webp';

import { fetchData } from '@/utils/fetchData';
import UserContext from "@/context/UserContext";
import BuyProject from "../BuyProject";
import ModalContext from "@/context/ModalContext";

function Modal() {
  const [hiddenBuy, SetHiddenBuy] = React.useState<boolean>(false);
  const [hiddenBuyCoinLivre, setHiddenBuyCoinLivre] = React.useState<boolean>(false);

  const [conditionalBuy, setConditionalBuy] = React.useState<string>('');

  const [realValue, setRealValue] = React.useState<string>('');
  const [projects, setProjects] = React.useState<any>([])
  const [projectSelected, setProjectSelected] = React.useState<any>();

  const { loggedIn } = React.useContext(UserContext)

  const { modalControl: [, setShowModal] } = React.useContext(ModalContext)

  React.useEffect(() => {
    fetchData(setProjects)
  }, [])

  return (
    <form className={Styles.form}>
      <div className={Styles.closeButtonDiv}>
        <CloseButton
          className={Styles.closeButton}
          onClick={(e: any) => {
            e.preventDefault()
            setShowModal(false)
          }}
        />
      </div>

      {hiddenBuyCoinLivre ? <BuyCoinLivre /> : ''}
      <HeaderModal />
      {hiddenBuy ? (
        <BuyProject
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
        <>
          <section className={Styles.sectionCard}>
            {!loggedIn[0] ? (
              <InvestCard
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
              <InvestCard
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
                  e.preventDefault()
                  if (e.target.id) {
                    setConditionalBuy(e.target.id)
                  }
                  setProjectSelected(item)
                  SetHiddenBuy(!hiddenBuy)
                }}
              />
            ))}
          </section>
        </>
      )}
    </form>
  )
}

export default Modal;