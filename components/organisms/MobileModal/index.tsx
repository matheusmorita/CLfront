import React from 'react';
import HeaderModalMobile from '../HeaderModalMobile';
import Styles from './styles.module.scss';
import InvestCardMobile from '@/organisms/InvestCardMobile';

import LogoImg from '@/assets/img/logo.webp'
import { fetchData } from '@/utils/fetchData';

function MobileModal() {
  const [projects, setProjects] = React.useState<any>([])

  React.useEffect(() => {
    fetchData(setProjects)
  }, [])

  return (
    <main className={Styles.mainMobileModal}>
      <section className={Styles.sectionItems}>
        <HeaderModalMobile />
        <section className={Styles.sectionCard}>
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
            onClick={() => { }}
          />
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
              onClick={() => { }}
            />
          ))}
        </section>
        <h1>Olá, sou o Modal mobile</h1>
      </section>
      <div>
        Buttons
      </div>
    </main>
  )
}

export default MobileModal;