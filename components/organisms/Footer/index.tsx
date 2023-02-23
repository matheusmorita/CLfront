import React from 'react'
import Section from '@/organisms/Section'
import Title from '@/atoms/Title'
import Paragrah from '@/atoms/Paragraph'
import Column from '@/molecules/Column'
import Social from '@/molecules/Social'
import Copyright from '@/molecules/Copyright'
import Image from 'next/image'

// Static
import Styles from './styles.module.scss'
import Logo from '@/assets/img/logo-white.webp'
import Metacast from '@/assets/img/metacast.webp'
import Networks from '@/molecules/Networks'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import UserContext from '@/context/UserContext'

const Footer = () => {
  const [languageBrowser, setLanguageBrowser] = React.useState<string>();

  const { t } = useTranslation();

  const { locale } = React.useContext(UserContext)

  React.useEffect(() => {
    const language = window.navigator.language
    setLanguageBrowser(language)
    // const beforePath = localStorage.getItem('beforePath')
    // router.push(`${beforePath}`)
  })
  return (
    <footer>
      <Section
        id='footer'
        label='footer-title'
        desc='footer-description'
        justify='center'
        hidden={false}
        className={`${Styles.background} d-flex align-items-center py-5`}
      >
        <Title
          id='footer-title'
          text="Rodapé da página"
          className='visually-hidden'
          hidden={false}
        />
        <Paragrah
          id='footer-description'
          text='Navegue pelo mapa do site e outros links úteis.'
          className='visually-hidden'
          hidden={false}
        />
        <section className={Styles.linksStyle} style={{
          // display: 'flex',
          // justifyContent: 'space-around',
          // alignItems: 'flex-start',
          // flexWrap: 'wrap'
        }}>
          <div className={Styles.footer__links}>
            <h1 className={Styles.footer__subtitle}>
              {languageBrowser !== 'pt-BR' ? t('A Coinlivre') : 'A Coinlivre'}
            </h1>
            <ul className={Styles.footer__list}>
              <li className={Styles.footer__item}>
                <a href="#">{languageBrowser !== 'pt-BR' ? t('Quem somos') : 'Quem somos'}</a>
              </li>
              <li className={Styles.footer__item}>
                <a href="#projetos">{languageBrowser !== 'pt-BR' ? t('Nossos projetos') : 'Nossos projetoss'}</a>
              </li>
              <li className={Styles.footer__item}>
                <a href="mailto:imprensa@coinlivre.com.br">{languageBrowser !== 'pt-BR' ? t('Assessoria de imprensa') : 'Assessoria de imprensa'}</a>
              </li>
            </ul>
          </div>

          <div className={Styles.footer__links}>
            <h1 className={Styles.footer__subtitle}>
              {languageBrowser !== 'pt-BR' ? t('Jurídico') : 'Jurídico'}
            </h1>
            <ul className={Styles.footer__list}>
              <li className={Styles.footer__item}>
                <Link href='TERMO_DE_USO.pdf' download locale={false}>{languageBrowser !== 'pt-BR' ? t('Termo de uso') : 'Termo de uso'}</Link>
              </li>
              <li className={Styles.footer__item}>
                <Link href='POLITICA_DE_PRIVACIDADE.pdf' download locale={false}>{languageBrowser !== 'pt-BR' ? t('Política de privacidade') : 'Política de privacidade'}</Link>
              </li>
            </ul>
          </div>

          <div className={Styles.footer__links}>
            <h1 className={Styles.footer__subtitle}>
              {languageBrowser !== 'pt-BR' ? t('Ajuda') : 'Ajuda'}
            </h1>
            <ul className={Styles.footer__list}>
              <li className={Styles.footer__item}>
                <a href="mailto:faleconosco@coinlivre.com.br">{languageBrowser !== 'pt-BR' ? t('Fale conosco') : 'Fale conosco'}</a>
              </li>
              <li className={Styles.footer__item}>
                <a href="#faq">{languageBrowser !== 'pt-BR' ? t('Perguntas frequentes') : 'Perguntas frequentes'}</a>
              </li>
              <li className={Styles.footer__item}>
                <a href="#">{languageBrowser !== 'pt-BR' ? t('Aprenda sobre tokenização') : 'Aprenda sobre tokenização'}</a>
              </li>
            </ul>
          </div>

          <div className={Styles.footer__links}>
            <h1 className={Styles.footer__subtitle}>
              {languageBrowser !== 'pt-BR' ? t('Compliance') : 'Compliance'}
            </h1>
            <ul className={Styles.footer__list}>
              <li className={Styles.footer__item}>
                <a href="mailto:faleconosco@coinlivre.com.br">{languageBrowser !== 'pt-BR' ? t('Ouvidoria') : 'Ouvidoria'}</a>
              </li>
            </ul>
          </div>

          <Column
            media='lg'
            size={2}
            className='vh-lg-50 d-flex flex-wrap align-content-between justify-content-center justify-content-lg-end'
          >

            <div style={{ maxWidth: '200px' }} className="d-flex flex-wrap justify-content-center justify-content-lg-end">
              <Image
                src={Logo}
                alt='Logomarca da CoinLivre'
                width={200}
                height={undefined}
              />
              <Image
                src={Metacast}
                alt='Logomarca da MetaCast'
                width={150}
                height={undefined}
              />
            </div>
            <Social
              className='w-100 justify-content-center justify-content-lg-end pt-lg-0 pt-3'
              label='Área de redes sociais'
              width={25}
            />
          </Column>

        </section>
        <Copyright />
      </Section>
      <Networks />
    </footer>
  )
}

export default Footer