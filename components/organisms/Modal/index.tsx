import React from "react";
import Styles from './styles.module.scss';

import HeaderModal from "@/components/organisms/HeaderModal";
import InvestCard from "@/components/molecules/InvestCard";
import BuyCoinLivre from "../buyCoinLivre";

import CloseButton from "@/components/atoms/CloseButton";

import Logo from '@/assets/img/logo.png';

import { fetchRequestPix } from '@/utils/fetchDataAxios';

import { fetchDataAxios, fetchDataUserInfo } from '@/utils/fetchDataAxios';
import UserContext from "@/context/UserContext";
import BuyProject from "../BuyProject";
import ModalContext from "@/context/ModalContext";
import { useRouter } from "next/router";

// languages
import en from '@/public/locales/en/common.json';
import pt from '@/public/locales/pt/common.json';


function Modal() {
  const [hiddenBuy, setHiddenBuy] = React.useState<boolean>(false);
  const [hiddenBuyCoinLivre, setHiddenBuyCoinLivre] = React.useState<boolean>(false);

  const [conditionalBuy, setConditionalBuy] = React.useState<string>('');

  const [realValue, setRealValue] = React.useState<string>('0');
  const [projects, setProjects] = React.useState<any>([])
  const [projectSelected, setProjectSelected] = React.useState<any>();
  const [requestPixValue, setRequestPixValue] = React.useState<string>('')
  const [valorToken, setValorToken] = React.useState<string>('')
  const [lote, setLote] = React.useState<object>();
  const [dataUser, setDataUser] = React.useState<any>();

  const router = useRouter()

  const { locale } = router;

  const t = locale === 'en' ? en : pt;

  const { loggedIn, setPathProject } = React.useContext(UserContext)

  const { modalControl: [, setShowModal] } = React.useContext(ModalContext)

  React.useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    fetchDataAxios("4", setProjects)
    fetchDataUserInfo(accessToken, setDataUser)

  }, [dataUser])

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

      {hiddenBuyCoinLivre ? <BuyCoinLivre balance={dataUser?.balanceCL} conditionalBuy={conditionalBuy} /> : ''}
      <HeaderModal balance={dataUser?.balanceCL} />
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
          setRequestPixValue={setRequestPixValue}
          requestPixValue={requestPixValue}
          valorToken={valorToken}
          balance={dataUser?.balanceCL}
          lote={lote}
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
                setRealValue('0')
                setHiddenBuy(!hiddenBuy)
              }}
            />
            {projects.map((item: any, i: number) => (
              <InvestCard
                key={i}
                acronimo={item.acronimo}
                alt='Esta é uma imagem de um projeto a ser exibido'
                emissor={item.emissor?.nomeEmissor}
                hiddenButton={false}
                id={item.id}
                name={item.nome}
                src={item.logoUrl}
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
                  setRealValue('0')
                  setLote(item?.lotes[item.lotes.length - 1])
                  setValorToken(item?.lotes[item.lotes.length - 1]?.valorDoToken)
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