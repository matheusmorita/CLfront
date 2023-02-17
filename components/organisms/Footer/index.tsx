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

const Footer = () => {
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
        <section style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          flexWrap: 'wrap'
        }}>
          <div className={Styles.footer__links}>
            <h1 className={Styles.footer__subtitle}>
              A coinlivre
            </h1>
            <ul className={Styles.footer__list}>
              <li className={Styles.footer__item}>
                <a href="#">quem somos</a>
              </li>
              <li className={Styles.footer__item}>
                <a href="#projetos">nossos projetos</a>
              </li>
              <li className={Styles.footer__item}>
                <a href="mailto:imprensa@coinlivre.com.br">assessoria de imprensa</a>
              </li>
            </ul>
          </div>

           <div className={Styles.footer__links}>
            <h1 className={Styles.footer__subtitle}>
              Jurídico
            </h1>
            <ul className={Styles.footer__list}>
              <li className={Styles.footer__item}>
                <Link href='TERMO_DE_USO.pdf' download locale={false}>termo de uso</Link>
              </li>
              <li className={Styles.footer__item}>
              <Link href='POLITICA_DE_PRIVACIDADE.pdf' download locale={false}>política de privacidade</Link>
              </li>
            </ul>
          </div>

          <div className={Styles.footer__links}>
            <h1 className={Styles.footer__subtitle}>
              Ajuda
            </h1>
            <ul className={Styles.footer__list}>
              <li className={Styles.footer__item}>
                <a href="mailto:faleconosco@coinlivre.com.br">fale conosco</a>
              </li>
              <li className={Styles.footer__item}>
                <a href="#faq">perguntas frequentes</a>
              </li>
              <li className={Styles.footer__item}>
                <a href="#">aprenda sobre tokenização</a>
              </li>
            </ul>
          </div>

          <div className={Styles.footer__links}>
            <h1 className={Styles.footer__subtitle}>
              Compliance
            </h1>
            <ul className={Styles.footer__list}>
              <li className={Styles.footer__item}>
                <a href="mailto:faleconosco@coinlivre.com.br">ouvidoria</a>
              </li>
            </ul>
          </div>

          <Column
          media='lg'
          size={2}
          className='vh-lg-50 d-flex flex-wrap align-content-between justify-content-center justify-content-lg-end'
        >

          <div style={{maxWidth: '200px'}} className="d-flex flex-wrap justify-content-center justify-content-lg-end">
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