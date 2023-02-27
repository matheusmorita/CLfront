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

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Footer = () => {

  const { t } = useTranslation('footer');

  React.useEffect(() => {
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
              {t('A Coinlivre')}
            </h1>
            <ul className={Styles.footer__list}>
              <li className={Styles.footer__item}>
                <a href="#sobre__container">{t('Quem somos')}</a>
              </li>
              <li className={Styles.footer__item}>
                <a href="#projetos">{t('Nossos projetos')}</a>
              </li>
              <li className={Styles.footer__item}>
                <a href="mailto:imprensa@coinlivre.com.br">{t('Assessoria de imprensa')}</a>
              </li>
            </ul>
          </div>

          <div className={Styles.footer__links}>
            <h1 className={Styles.footer__subtitle}>
              {t('Jurídico')}
            </h1>
            <ul className={Styles.footer__list}>
              <li className={Styles.footer__item}>
                <a href='TERMO_DE_USO.pdf' download>{t('Termo de uso')}</a>
              </li>
              <li className={Styles.footer__item}>
                <a href='POLITICA_DE_PRIVACIDADE.pdf' download>{t('Política de privacidade')}</a>
              </li>
            </ul>
          </div>

          <div className={Styles.footer__links}>
            <h1 className={Styles.footer__subtitle}>
              {t('Ajuda')}
            </h1>
            <ul className={Styles.footer__list}>
              <li className={Styles.footer__item}>
                <a href="mailto:faleconosco@coinlivre.com.br">{t('Fale conosco')}</a>
              </li>
              <li className={Styles.footer__item}>
                <a href="#faq">{t('Perguntas frequentes')}</a>
              </li>
              <li className={Styles.footer__item}>
                <a
                  rel='noreferrer'
                  href="https://www.youtube.com/@metacast9068"
                  target="_blank">{t('Aprenda sobre tokenização')}</a>
              </li>
            </ul>
          </div>

          <div className={Styles.footer__links}>
            <h1 className={Styles.footer__subtitle}>
              {t('Compliance')}
            </h1>
            <ul className={Styles.footer__list}>
              <li className={Styles.footer__item}>
                <a href="mailto:faleconosco@coinlivre.com.br">{t('Ouvidoria')}</a>
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

export async function getStaticProps({ locale }: { locale: string }) {
  return {
      props: {
          ...(await serverSideTranslations(locale, ['footer']))
      }
  }
}

export default Footer