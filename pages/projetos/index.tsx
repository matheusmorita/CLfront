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

export default function Projetos() {
  const [dataUser, setDataUser] = React.useState<any>();

  const router = useRouter();


  React.useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    const getUserAdmin = async () => {
      const isAdmin = await fetchDataUserInfo(accessToken, setDataUser)
      // if (!isAdmin) {
      //   router.push('/notfound')
      // }
    }
    getUserAdmin()
  }, [router])
  return (
    <>
      <Header />
      <div className={`${Styles.background} ${Styles.intro}`} />

      <main className={Styles.main}>
        <h1>Projetos</h1>
        <p className={Styles.main__description}>Tenha controle sobre todos os projetos da Coinlivre.</p>

        <TableProjects />
      </main>


    </>
  )
}
