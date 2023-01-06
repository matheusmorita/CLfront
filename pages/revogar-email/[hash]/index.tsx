import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Frame from '../../../templates/Frame'
import Section from '../../../components/organisms/Section'
import Column from '../../../components/molecules/Column'
import Separator from '../../../components/atoms/Separator'
import Title from '../../../components/atoms/Title'
import Paragrah from '../../../components/atoms/Paragraph'
import Button from '../../../components/atoms/Button'

import Logo from '../../../assets/img/brand.webp'
import Styles from './styles.module.scss'
import Data from './_json/SiteData.json'
import { useRouter } from 'next/router'

const RevogarEmail = () => {
  const router = useRouter()
  const hash = router.query.hash

  return (
    <Frame
      id={`revogar-${hash}`}
      role='main'
      label='Página de cancelar assinatura'
    >
      <Head>
        <title>CoinLivre | Revogar e-mail</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#00ee8d" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content="CoinLivre | Revogar e-mail." />
      </Head>

      <Section
        id='introducao'
        label='introducao-title'
        desc='introducao-description'
        justify='center'
        hidden={false}
        className={`${Styles.intro} pt-5 d-flex align-items-center pb-5`}
      >
        <Column
          media='lg'
          size={5}
          className="pt-5 d-flex align-content-center flex-wrap"
        >
          <Separator
            color="#00EE8D"
          />
          <Title
            id='introducao-title'
            text={Data.title}
            hidden={false}
            size={42}
            height={42}
            width={50}
            weight="normal"
            className="mb-2"
          />
          <Paragrah
            id='introducao-description'
            text={Data.description}
            hidden={false}
            width={35}
            size={18}
            height={22}
            className="mb-4 d-block w-100"
          />
          <Button
            id='emissor-cta'
            text={Data.button.text}
            label={Data.button.label}
            hidden={false}
            disabled={false}
            onClick={() => {
              location.href = (Data.button.path)
            }}
          />
        </Column>

        <Column
          media='lg'
          size={3}
          className="pt-5"
        >
          <Image
            priority
            src={Logo}
            width={400}
            height={100}
            alt='Logo da CoinLivre'
            className={`${Styles.introducao__logo} img-fluid`}
          />
        </Column>
      </Section>
    </Frame>
  )
}

export default RevogarEmail