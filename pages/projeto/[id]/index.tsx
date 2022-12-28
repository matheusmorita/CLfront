import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Styles from './styles.module.scss'

import Frame from '../../../templates/Frame'
import Section from '../../../components/organisms/Section'
import Column from '../../../components/molecules/Column'
import Title from '../../../components/atoms/Title'
import Paragrah from '../../../components/atoms/Paragraph'
import Subtitle from '../../../components/atoms/Subtitle'
import Category from '../../../components/atoms/Category'
import Button from '../../../components/atoms/Button'

const ProjectPage = () => {
  const router = useRouter()
  const id = router.query.id

  const Data = {
    banner: {
      title: "PROJETO",
      subtitle: "SUBTÍTULO",
      category: "TOKEN DE ENERGIA",
      description: "Token de funding de maquinário industrial para produção de energia limpa, com retorno sobre o modelo de negócios de comodato para grandes empresas, e sempre após implementação dos produtos. Rentabilidade Estimada: 24,6% a.a."
    }
  }

  return (
    <Frame
      id={`projeto-${id}`}
      role='main'
      label='Página de projeto'
    >
      <Head>
        <title>CoinLivre | Projetos</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#00ee8d" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content="CoinLivre | Projetos." />
      </Head>
      <Section
        id='introducao'
        label='introducao-title'
        desc='introducao-description'
        justify='center'
        hidden={false}
        className={`${Styles.background} ${Styles.intro} pt-5 pt-lg-0 d-flex align-items-center pb-5`}
      >
        <Column
          media='lg'
          size={10}
          className="pt-5"
        >
          <Subtitle 
            text={Data.banner.subtitle}
            color="#00EE8D"
          />
          <Title
            id='introducao-title'
            text={Data.banner.title}
            hidden={false}
            size={100}
            height={100}
            width={14}
            weight="normal"
            className={`${Styles.intro__title} mb-4`}
          />
          <Paragrah
            id='introducao-description'
            text={Data.banner.description}
            hidden={false}
            width={39}
            size={18}
            height={22}
            color="#D3D3D3"
          />
          <Category
            iconName={"flash-sharp"}
            text={Data.banner.category}
            className="mt-5 mb-5"
          />
          <Button
            id="header-cta"
            text="Simular investimento"
            label="Clique e cadastre-se na Lista VIP"
            hidden={false}
            disabled={false}
            size={20}
            onClick={() => {
              window.scrollTo(0, 0)
            }}
          />
        </Column>
      </Section>

      <Section
        id='sobre'
        label='sobre-title'
        desc='sobre-description'
        justify='center'
        hidden={false}
        className={`${Styles.sobre} pt-5 pt-lg-0 d-flex align-items-center pb-5`}
      >

      </Section>
    </Frame>
  )
}

export default ProjectPage