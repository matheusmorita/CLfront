import Header from '@/components/organisms/Header';
import { fetchDataUserInfo } from '@/utils/fetchDataAxios';
import { useRouter } from 'next/router';
import React from 'react';

import Styles from './styles.module.scss';

function Admin() {
  const [dataUser, setDataUser] = React.useState<any>();

  const router = useRouter();


  React.useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    fetchDataUserInfo(accessToken, setDataUser)
  }, [])

  return (
    <>
      {dataUser?.isAdmin ? (
        <>
          <Header />

          <main className={Styles.main}>

            <section className={Styles.welcome}>
              <h1>Bem-vindo(a) a tela de admin, {dataUser?.nome}</h1>

              <div className={Styles.welcome__picture}>picture</div>
            </section>

            <section className={Styles.main__selections}>
              <h1>Escolha a melhor opção</h1>
              <div></div>
            </section>
          </main>
        </>
      ) : (
        router.push('/notfound')
      )}
    </>
  )
}

export default Admin;