import { CardAdmin } from '@/components/organisms/CardAdmin';
import Header from '@/components/organisms/Header';
import { fetchDataUserInfo } from '@/utils/fetchDataAxios';
import { useRouter } from 'next/router';
import React from 'react';

import Styles from './styles.module.scss';

//components
import Slider from 'react-slick';

//assets
import bgEmissor from '../../assets/img/backgroundEmissor.png'
import bgProjetos from '@/assets/img/backgroundProjetos.png'
import bgInvestidor from '@/assets/img/backgroundInvestidor.png'
import Image from 'next/image';
import defaultImage from '@/assets/img/placeholder.webp'

function Admin() {
  const [dataUser, setDataUser] = React.useState<any>();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

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
      <>
        <Header />

        <div className={`${Styles.background} ${Styles.intro}`} />
        <section className={Styles.sectionAdmin}>
          <div className={Styles.sectionAdmin__userAdminSection}>
            <Image
              alt='Imagem do usuário Admin'
              src={dataUser?.imgPerfilUrl || defaultImage}
              className={Styles.sectionAdmin__profileImage} />
            <div>
              <h2 className={Styles.sectionAdmin__title}>{dataUser?.nome || 'Admin'}, bem-vindo(a).</h2>
              <p className={Styles.sectionAdmin__description}>
                Aqui você pode realizar o gerenciamento total dos projetos,
                definir dados de emissor, data de lançamento, término de lotes, dentre outras opções.
              </p>
            </div>
          </div>
          <section className={Styles.sectionAdmin__cardSection}>
            <CardAdmin
              href='#'
              title='Emissor'
              background={bgEmissor}
            />
            <CardAdmin
              href='/admin/projetos'
              title='Projetos'
              background={bgProjetos}
            />
            <CardAdmin
              href='#'
              title='Investidores'
              background={bgInvestidor}
            />
          </section>
        </section>
      </>
    </>
  )
}

export default Admin;