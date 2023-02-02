import React from "react";
import Styles from './styles.module.scss';

import HeaderModal from "@/components/molecules/HeaderModal";
import InvestCard from "@/components/molecules/InvestCard";
import Button from "@/components/atoms/Button";
import InputModal from "@/components/molecules/InputModal";
import BuyCoinLivre from "../buyCoinLivre";

import Logo from '@/assets/img/logo.webp';

import { fetchData } from '@/utils/fetchData';
import UserContext from "@/context/UserContext";

function Modal() {
  const [hidden, SetHidden] = React.useState<boolean>(false);
  const [realValue, setRealValue] = React.useState<string>('');
  const [projects, setProjects] = React.useState<any>([])

  const { loggedIn } = React.useContext(UserContext)

  React.useEffect(() => {
    fetchData(setProjects)
  }, [])


  

  return (
    <main>
      <form className={Styles.form}>
        {/* <BuyCoinLivre /> */}
        <HeaderModal />
        {hidden ? (
          <div className={Styles.divInput}>
            <p className={Styles.descriptionText}>Este é um texto de exemplo para dar descrição do projeto</p>
            <InputModal
              id="inputReal"
              label="Insira o valor em reais"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setRealValue(e.target.value)
              }}
            />
            <InputModal
              id="inputMoedaSelecionada"
              label="Você receberá em CLNT"
              disabled={true}
              value={realValue}
            />

            <div className={Styles.checkboxLabel}>
              <input
                id="checkboxInput"
                type="checkbox"
                className={Styles.checkboxInput}

              />
              <label
                htmlFor="checkboxInput"
                className={Styles.descriptionText}
              >
                Você concorda com os termos de uso da plataforma e está ciente dos usos das 
                ferramentas incorporados nessa aplicação?
              </label>
            </div>
            <div className={Styles.divButtons}>
              <Button
                hidden={false}
                id="backButton"
                label="Clique para voltar"
                onClick={() => { SetHidden(!hidden) }}
                text="Voltar"
                size={25}
                className={Styles.divButtons__backButton}
              />
              <Button
                hidden={false}
                id="generateQRButton"
                label="Clique para gerar QR code"
                onClick={() => { }}
                text="Gerar QR Code"
                size={25}
                className={Styles.divButtons__QRButton}
              />
            </div>
          </div>
        ) : (
          <>
            <section className={Styles.sectionCard}>
              {!loggedIn[0] ? (
                <InvestCard 
                name="Token CoinLivre"
                acronimo="CLNT"
                emissor="CoinLivre"
                alt="Card CoinLivre"
                label="Comprar"
                hidden={false}
                id={`CoinLivre - ${0}`}
                src={Logo}
                text="Comprar"
                onClick={() => { SetHidden(!hidden) }}
              />
              ) : ''}
              {projects.map((item: any, i: number) => (
                <InvestCard
                  key={item.Projeto.acronimo}
                  src={item.Projeto.logo.url}
                  alt='Esta é uma imagem de um projeto a ser exibido'
                  text='Comprar'
                  acronimo={item.Projeto.acronimo}
                  emissor={item.Emissor.nome}
                  name={item.Projeto.nome}
                  hidden={true}
                  id={`${item} - ${i+1}`}
                  label='Clique para comprar'
                  onClick={() => { SetHidden(!hidden) }}
                />
              ))}
            </section>
          </>
        )}
      </form>

    </main>
  )
}

export default Modal;