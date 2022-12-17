import React from 'react'
import Section from '../Section'
import Title from '../../atoms/Title'
import Paragrah from '../../atoms/Paragraph'
import Column from '../../molecules/Column'
import Social from '../../molecules/Social'
import Copyright from '../../molecules/Copyright'
import Image from 'next/image'

// Static
import Styles from './styles.module.scss'
import Logo from '../../../assets/img/logo-white.webp'

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
        <Column
          media='lg'
          size={2}
        >
          {/* A Coinlivre (Links) */}
          <div className={Styles.footer__links}>
            <h1 className={Styles.footer__subtitle}>
              A coinlivre
            </h1>
            <ul className={Styles.footer__list}>
              <li className={Styles.footer__item}>
                <a href="#">Quem somos</a>
              </li>
              <li className={Styles.footer__item}>
                <a href="#">Nossos Projetos</a>
              </li>
              <li className={Styles.footer__item}>
                <a href="#">Assessoria de imprensa</a>
              </li>
            </ul>
          </div>

          {/* Jurídico (Links) */}
          <div className={Styles.footer__links}>
            <h1 className={Styles.footer__subtitle}>
              Jurídico
            </h1>
            <ul className={Styles.footer__list}>
              <li className={Styles.footer__item}>
                <a href="#">Termo de uso</a>
              </li>
              <li className={Styles.footer__item}>
                <a href="#">Política de privacidade</a>
              </li>
            </ul>
          </div>
        </Column>
        <Column
          media='lg'
          size={2}
        >
          {/* Ajuda (Links) */}
          <div className={Styles.footer__links}>
            <h1 className={Styles.footer__subtitle}>
              Ajuda
            </h1>
            <ul className={Styles.footer__list}>
              <li className={Styles.footer__item}>
                <a href="#">Fale conosco</a>
              </li>
              <li className={Styles.footer__item}>
                <a href="#">Perguntas Frequentes</a>
              </li>
              <li className={Styles.footer__item}>
                <a href="#">Aprenda sobre Tokenização</a>
              </li>
            </ul>
          </div>

          {/* Compliance (Links) */}
          <div className={Styles.footer__links}>
            <h1 className={Styles.footer__subtitle}>
              Compliance
            </h1>
            <ul className={Styles.footer__list}>
              <li className={Styles.footer__item}>
                <a href="#">Ouvidoria</a>
              </li>
            </ul>
          </div>
        </Column>
        <Column
          media='lg'
          size={8}
          className='vh-lg-50 d-flex flex-wrap align-content-between justify-content-center justify-content-lg-end'
        >
          <Image
            src={Logo}
            alt='Logomarca da CoinLivre'
            width={200}
            height={undefined}
          />
          <Social
            className='w-100 justify-content-center justify-content-lg-end pt-lg-0 pt-3'
            label='Área de redes sociais'
            width={25}
          />
        </Column>
        <Copyright />
      </Section>
    </footer>
  )
}

export default Footer