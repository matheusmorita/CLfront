import { CardAdmin } from '@/components/organisms/CardAdmin';
import Header from '@/components/organisms/Header';
import { fetchDataUserInfo } from '@/utils/fetchDataAxios';
import { useRouter } from 'next/router';
import React from 'react';

import Styles from './styles.module.scss';

//assets
import bgEmissor from '@/assets/img/backgroundEmissor.png'
import bgProjetos from '@/assets/img/backgroundProjetos.png'
import bgInvestidor from '@/assets/img/backgroundInvestidor.png'
import TableProjects from '@/components/organisms/TableProjects';
import RegisterProject from '@/components/organisms/RegisterProject';
import Overlay from '@/components/molecules/Overlay';

export default function Projetos() {
  const [dataUser, setDataUser] = React.useState<any>();
  const [modalRegisterProject, setModalRegisterProject] = React.useState<boolean>(false);
  const [isOpenOverlay, setIsOpenOverlay] = React.useState<boolean>(true);


  const router = useRouter();


  React.useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    fetchDataUserInfo(accessToken, setDataUser, router)
  }, [router])
  return (
    <>
      {/* {modalRegisterProject && (
        <RegisterProject />
      )} */}
      <Header />
      <div className={`${Styles.background} ${Styles.intro}`} />

      {isOpenOverlay && (
        <Overlay
          isOpen={isOpenOverlay}
          setIsOpen={setIsOpenOverlay}
          setMenuItemIsOpen={setIsOpenOverlay}
          setopenLink={setIsOpenOverlay}
        />
      )}
      {modalRegisterProject && (
        <RegisterProject
          modalRegisterProject={modalRegisterProject}
          setModalRegisterProject={setModalRegisterProject}
        />
      )}
      <main className={Styles.main}>
        <h1>Projetos</h1>
        <p className={Styles.main__description}>Tenha controle sobre todos os projetos da Coinlivre.</p>

        <TableProjects
          modalRegisterProject={modalRegisterProject}
          setModalRegisterProject={setModalRegisterProject}
        />
      </main>


    </>
  )
}
