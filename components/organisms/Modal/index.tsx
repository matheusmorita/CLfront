import React from "react";
import Styles from './styles.module.scss';

import HeaderModal from "@/components/organisms/HeaderModal";
import InvestCard from "@/components/molecules/InvestCard";
import BuyCoinLivre from "../buyCoinLivre";

import CloseButton from "@/components/atoms/CloseButton";

import Logo from '@/assets/img/logo.png';

import { fetchRequestPix } from '@/utils/fetchDataAxios';

import { fetchData } from '@/utils/fetchData';
import { fetchDataAxios, fetchDataUserInfo } from '@/utils/fetchDataAxios';
import UserContext from "@/context/UserContext";
import BuyProject from "../BuyProject";
import ModalContext from "@/context/ModalContext";

function Modal() {
  const [hiddenBuy, setHiddenBuy] = React.useState<boolean>(false);
  const [hiddenBuyCoinLivre, setHiddenBuyCoinLivre] = React.useState<boolean>(false);

  const [conditionalBuy, setConditionalBuy] = React.useState<string>('');

  const [realValue, setRealValue] = React.useState<string>('');
  const [balance, setBalance] = React.useState<number>(0)
  const [projects, setProjects] = React.useState<any>([])
  const [projectSelected, setProjectSelected] = React.useState<any>();

  const { loggedIn } = React.useContext(UserContext)

  const { modalControl: [, setShowModal] } = React.useContext(ModalContext)

  React.useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    fetchDataAxios("4", setProjects)
    fetchDataUserInfo(accessToken, setBalance)
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

      {hiddenBuyCoinLivre ? <BuyCoinLivre balance={balance} conditionalBuy={conditionalBuy} /> : ''}
      <HeaderModal balance={balance} />
      {hiddenBuy ? (
        <BuyProject
          setHiddenBuy={setHiddenBuy}
          hiddenBuy={hiddenBuy}
          hiddenBuyCoinLivre={hiddenBuyCoinLivre}
          realValue={realValue}
          setHiddenBuyCoinLivre={setHiddenBuyCoinLivre}
          setRealValue={setRealValue}
          conditionalBuy={conditionalBuy}
          projectSelected={projectSelected}
          setConditionalBuy={setConditionalBuy}
          setProjectSelected={setProjectSelected}
          fetchRequestPix={fetchRequestPix}
        />
      ) : (
        <>
          <section className={Styles.sectionCard}>
            <InvestCard
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
              <InvestCard
                key={i}
                acronimo={item.acronimo}
                alt='Esta é uma imagem de um projeto a ser exibido'
                emissor={item.emissor.nomeEmissor}
                hiddenButton={false}
                id={item.id}
                name={item.nome}
                src={item.logoUrl}
                text='Comprar'
                onClick={(e: any) => {
                  e.preventDefault()
                  if (e.target.id) {
                    setConditionalBuy(e.target.id)
                  }
                  setRealValue('')
                  setProjectSelected(item)
                  setHiddenBuy(!hiddenBuy)
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