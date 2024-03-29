import React from 'react'
import Frame from '@/templates/Frame'
import Section from '@/components/organisms/Section'
import Title from '@/components/atoms/Title'
import Paragrah from '@/components/atoms/Paragraph'
import Column from '@/components/molecules/Column'
import Separator from '@/components/atoms/Separator'
import Image from 'next/image'
import Head from 'next/head'

// Static
import Data from './_json/SiteData.json'
import Styles from './styles.module.scss'
import Brand from '@/assets/img/brand.webp'
import Discord from '@/assets/img/discord.webp'
import Button from '@/components/atoms/Button'
import Faq from '@/components/organisms/Faq'
import Projects from '@/components/organisms/Projects'
import WaitingList from '@/components/organisms/WaitingList'

const QuemSomos = () => {
  return (
    <Frame
      id='quem-somos'
      role='main'
      label='Página de sobre da CoinLivre'
    >
      <Head>
        <title>CoinLivre | Quem Somos</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#00ee8d" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content="CoinLivre | Quem Somos." />
      </Head>
      <Section
        id='introducao'
        label='introducao-title'
        desc='introducao-description'
        justify='center'
        hidden={false}
        className={`${Styles.background} min-vh-100 pt-5 pt-lg-0 d-flex align-items-center pb-5`}
      >
        <Column
          media='lg'
          size={5}
          className="pt-5"
        >
          <Separator
            color='#00ee8d'
          />
          <Title
            id='introducao-title'
            text={Data.banner.title}
            hidden={false}
            width={14}
          />
          <Paragrah
            id='introducao-description'
            text={Data.banner.description}
            hidden={false}
            width={24}
          />
        </Column>
        <Column
          media='lg'
          size={4}
        >
          <WaitingList />
        </Column>
      </Section>

      <Section
        id='sobre'
        label='sobre-title'
        desc='sobre-description'
        justify='center'
        hidden={false}
        className={`${Styles.gradient} vh-lg-100 d-flex align-items-center pb-5`}
      >
        <Column
          media='lg'
          size={6}
        >
          <Image
            src={Brand}
            alt='Touro da Logomarca'
            className='img-fluid w-75 d-none d-lg-block'
          />
        </Column>
        <Column
          media='lg'
          size={6}
        >
          <Separator
            color='#FFFFFF'
          />
          <Title
            id='sobre-title'
            text="Sobre a CoinLivre"
            className='visually-hidden'
            hidden={false}
          />
          <Paragrah
            id='sobre-description'
            text={Data.about.paragraph}
            hidden={false}
            width={30}
          />
          <Image
            src={Brand}
            alt='Touro da Logomarca'
            className='img-fluid w-100 d-lg-none'
          />
        </Column>
      </Section>

      <Section
        id='projetos'
        label='projetos-title'
        desc='projetos-description'
        justify='start'
        hidden={false}
        className={`${Styles.bright} mt-5 py-5`}
      >
        <Title
          id='projetos-title'
          text={Data.projects.title}
          className={`${Styles.bright__title} fw-normal`}
          color='#1d3315'
          hidden={false}
        />
        <Paragrah
          id='projetos-description'
          text={Data.projects.description}
          className="pt-3 pb-5"
          color='#606060'
          hidden={false}
          width={43}
          size={24}
        />
        <Projects />
      </Section>

      <Section
        id='faq'
        label='faq-title'
        desc='faq-description'
        justify='center'
        hidden={false}
        className={`mt-5 d-flex align-items-center`}
      >
        <Title
          id='faq-title'
          text="Ficou alguma dúvida?"
          className='fw-bold'
          color='#00ee8d'
          hidden={false}
        />
        <Column
          media='lg'
          size={12}
          className='my-5 d-block align-items-center justify-content-start flex-wrap'
        >
          <Faq
            data={Data.faq}
          />
        </Column>
      </Section>

      <Section
        id='discord'
        label='discord-title'
        desc='discord-description'
        justify='center'
        hidden={false}
        className={`${Styles.lighten} d-flex align-items-center`}
      >
        <Column
          media='lg'
          size={4}
          className='d-flex flex-wrap justify-content-center text-center mt-5 pb-5'
        >
          <Title
            id='discord-title'
            text='Entre em nosso Discord'
            className='visually-hidden'
            hidden={false}
          />
          <Image
            src={Discord}
            alt='Discord logo'
            className='img-fluid w-75'
          />
          <Paragrah
            id='discord-description'
            text={Data.discord.paragraph}
            className="py-2"
            hidden={false}
            width={20}
            size={18}
          />
          <Button
            id='discord-cta'
            text='ACOMPANHE NOSSOS PRÓXIMOS PASSOS'
            label='Clique e acompanhe nossos próximos passos'
            hidden={false}
            disabled={false}
            onClick={() => {
              window.open('https://discord.gg/Xx9U4j74Aa')
            }}
          />
        </Column>
      </Section>
    </Frame>
  )
}

export default QuemSomos