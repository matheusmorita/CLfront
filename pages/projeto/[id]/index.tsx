/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Data from './_json/SiteData.json'
import Styles from './styles.module.scss'
import Discord from '@/assets/img/discord_2.webp'

import Frame from '@/templates/Frame'
import Section from '@/components/organisms/Section'
import Column from '@/components/molecules/Column'
import Title from '@/components/atoms/Title'
import Paragrah from '@/components/atoms/Paragraph'
import Subtitle from '@/components/atoms/Subtitle'
import Category from '@/components/atoms/Category'
import Button from '@/components/atoms/Button'
import DataShow from '@/components/molecules/DataShow'
import Separator from '@/components/atoms/Separator'
import QuotaShow from '@/components/molecules/QuotaShow'
import TabNavigation from '@/components/organisms/TabNavigation'

import Modal from '@/components/organisms/Modal'
import ModalContext from '@/context/ModalContext'

import MobileModal from '@/components/organisms/MobileModal'

import * as masks from '@/assets/js/util/masks'
import UserContext from '@/context/UserContext'
import axios from 'axios'
import { fetchDataIdAxios } from '@/utils/fetchDataAxios'

import i18next from '@/src/i18n';


const ProjectPage = () => {
  const router = useRouter()
  const id = router.query.id
  const [project, setProject] = React.useState<any>()

  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [showMobileModal, setShowMobileModal] = React.useState<boolean>(false)
  const [lengthWindow, setLengthWindow] = React.useState<number>(0)

  const [languageBrowser, setLanguageBrowser] = React.useState<string>();


  const { loggedIn } = React.useContext(UserContext)

  // fetchDataIdAxios()

  React.useEffect(() => {
    if (!id) return
    const language = window.navigator.language
    setLanguageBrowser(language)

    const idProject = localStorage.getItem('idProject')
    fetchDataIdAxios(idProject, setProject)
    const largura = window.innerWidth
    setLengthWindow(largura)

    // const beforePath = localStorage.getItem('beforePath')
    // router.push(`${beforePath}`)
  }, [router])

  if (project) {
    return (
      <ModalContext.Provider
        value={{
          modalControl: [showModal, setShowModal],
          modalMobileControl: [showMobileModal, setShowMobileModal]
        }}
      >
        {showMobileModal ? (<MobileModal />) : ''}
        {showModal ? (
          <section className={Styles.divFormModal}>
            <Modal />
          </section>
        ) : ''}
        <main>
          <Frame
            id={`projeto-${id}`}
            role='main'
            label='Página de projeto'
          >
            <Head>
              <title>Projetos</title>
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
              bgImage={project.imgFundo}
            >
              <Column
                media='lg'
                size={10}
                className="pt-5"
              >
                <Subtitle
                  text={project.acronimo}
                  color="#00EE8D"
                />
                <Title
                  id='introducao-title'
                  text={languageBrowser !== 'pt-BR' ? i18next.t(project.nome) : project.nome}
                  hidden={false}
                  size={100}
                  height={100}
                  width={12}
                  weight="normal"
                  className={`${Styles.intro__title} mb-4`}
                />
                <Paragrah
                  id='introducao-description'
                  text={project.resumo}
                  hidden={false}
                  width={39}
                  size={18}
                  height={22}
                  color="#D3D3D3"
                />
                <Category
                  iconName={"flash-sharp"}
                  text={`${project.tipoToken}`}
                  className="mt-5 mb-5"
                />
                <Button
                  id="introducao-cta"
                  text={languageBrowser === "en-US" ? i18next.t('Investir') : 'Investir'}
                  label="Clique e escolha um projeto para investir"
                  hidden={false}
                  disabled={false}
                  size={20}
                  onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    // if (!loggedIn[0]) {
                    //   return location.href = '/login'
                    // }
                    if (lengthWindow < 700) {
                      return setShowMobileModal(!showMobileModal)
                    }
                    return setShowModal(!showModal)
                  }}
                />
              </Column>
            </Section>

            <TabNavigation
              links={[
                { name: "Sobre", path: "sobre" },
                { name: "Documentos", path: "documentos" },
                { name: "Emissor", path: "emissor" }
              ]}
              languageBrowser={languageBrowser}
            />

            <Section
              id='sobre'
              label='sobre-title'
              desc='sobre-description'
              justify='center'
              hidden={false}
              className={`${Styles.sobre} pt-5 pt-lg-0 d-flex align-items-center pb-lg-5`}
            >
              <Column
                media='lg'
                size={6}
                className="pt-5"
              >
                <Separator
                  color="#00EE8D"
                />
                <Title
                  id='sobre-title'
                  text={languageBrowser !== 'pt-BR' ? i18next.t(Data.sobre.title) : Data.sobre.title}
                  hidden={false}
                  size={48}
                  height={48}
                  width={14}
                  weight="normal"
                  color="#404040"
                  className={`${Styles.sobre__title} mb-4`}
                />
                <Paragrah
                  id='sobre-description'
                  text={project.descricao}
                  hidden={false}
                  width={45}
                  size={18}
                  height={22}
                  color="#6C6C6C"
                />
              </Column>
              <Column
                media='lg'
                size={6}
                className="pt-5"
              >
                <div className={Styles.grid}>
                  {project.criadoEm && (
                    <DataShow
                      languageBrowser={languageBrowser}
                      title={"Data de lançamento"}
                      value={masks.getDateMask(project.criadoEm)}
                      badge={{
                        type: "success",
                        message: "NOVO"
                      }}
                      contractLink={project.contratoToken}
                    />
                  )}
                  {project.rentabilidade ? (
                    <DataShow
                      languageBrowser={languageBrowser}
                      title={"Rentabilidade"}
                      value={languageBrowser !== 'pt-BR' ? i18next.t(project.rentabilidade) : project.rentabilidade}
                      badge={{ type: "success", message: "NOVO" }}
                      contractLink={project.contratoToken}
                    />) : (
                    <DataShow
                      languageBrowser={languageBrowser}
                      title={"Rentabilidade"}
                      value={'N/A'}
                      contractLink={project.contratoToken}
                    />)}

                  {project.lotes.length > 0 ? (
                    <DataShow
                      languageBrowser={languageBrowser}
                      title={"Lote"}
                      value={project.lotes[project.lotes.length - 1].idLote}
                      badge={{ type: "success", message: "NOVO" }}
                      contractLink={project.contratoToken}
                    />) : (
                    <DataShow
                      languageBrowser={languageBrowser}
                      title={"Lote"}
                      value={'N/A'}
                      contractLink={project.contratoToken}
                    />)}

                  {project.lotes.length > 0 ? (
                    <DataShow
                      languageBrowser={languageBrowser}
                      title={"Valor do Token"}
                      value={masks.getCurrencyMask(project.lotes[project.lotes.length - 1].valorDoToken)}
                      contractLink={project.contratoToken}
                    />) : (
                    <DataShow
                      languageBrowser={languageBrowser}
                      title={"Valor do Token"}
                      value={'N/A'}
                      contractLink={project.contratoToken}
                    />)}

                  {project.lotes.length > 0 ? (
                    <DataShow
                      languageBrowser={languageBrowser}
                      title={"Prazo do Lote"}
                      value={project.lotes[project.lotes.length - 1].prazoDoLote}
                      contractLink={project.contratoToken}
                    />) : (
                    <DataShow
                      languageBrowser={languageBrowser}
                      title={"Prazo do Lote"}
                      value={'00/00/0000'}
                      contractLink={project.contratoToken}
                    />)}

                  {project.lotes.length > 0 ? (
                    <DataShow
                      languageBrowser={languageBrowser}
                      title={"QTDE de Tokens"}
                      value={masks.getQuantityMask(project.lotes[project.lotes.length - 1].qtdeDeTokens)}
                      contractLink={project.contratoToken}
                    />) : (
                    <DataShow
                      languageBrowser={languageBrowser}
                      title={"QTDE de Tokens"}
                      value={'N/A'}
                      contractLink={project.contratoToken}
                    />)}
                  <DataShow
                    languageBrowser={languageBrowser}
                    title={"Contrato"}
                    value={project.contratoToken}
                    highlight={true}
                    badge={{ type: "success", message: "DESTAQUE" }}
                    contractLink={project.contratoToken}
                  />
                  {project.lotes.length > 0 ? (
                    <DataShow
                      languageBrowser={languageBrowser}
                      title={"Captação"}
                      value={project.lotes[project.lotes.length - 1].captacao}
                      highlight={true}
                      badge={{ type: "success", message: "DESTAQUE" }}
                      contractLink={project.contratoToken}
                    />) : (
                    <DataShow
                      languageBrowser={languageBrowser}
                      title={"Captação"}
                      value={'N/A'}
                      highlight={true}
                      badge={{ type: "success", message: "DESTAQUE" }}
                      contractLink={project.contratoToken}
                    />
                  )}
                </div>
              </Column>
            </Section>

            <Section
              id='documentos'
              label='documentos-title'
              desc='documentos-description'
              justify='between'
              hidden={false}
              className={`${Styles.documentos} pt-5 pt-lg-0 d-flex align-items-center pb-5`}
            >
              <Column
                media='lg'
                size={5}
                className="pt-5"
              >
                <Separator
                  color="#00EE8D"
                />
                <Title
                  id='documentos-title'
                  text={languageBrowser !== 'pt-BR' ? i18next.t(Data.documentos.title) : Data.documentos.title}
                  hidden={false}
                  size={48}
                  height={48}
                  width={14}
                  weight="normal"
                  color="#404040"
                  className={`${Styles.documentos__title} mb-4`}
                />
                <Paragrah
                  id='documentos-description'
                  text={Data.documentos.description}
                  className="mb-5"
                  hidden={false}
                  width={45}
                  size={18}
                  height={22}
                  color="#6C6C6C"
                />
                <DataShow
                  languageBrowser={languageBrowser}
                  title={"Título do doc"}
                  value={"NOME_DO_ARQUIVO.PDF"}
                  className="mb-3"
                  badge={{
                    type: "success",
                    message: "DOCUMENTO"
                  }}
                  contractLink={project.contratoToken}
                />
                <DataShow
                  languageBrowser={languageBrowser}
                  title={"Título do doc"}
                  value={"NOME_DO_ARQUIVO.PDF"}
                  badge={{
                    type: "success",
                    message: i18next.t("DOCUMENTO")
                  }}
                  contractLink={project.contratoToken}
                />
              </Column>
              <Column
                media='lg'
                size={6}
                className="pt-5"
              >
                <div className={Styles.gradbox}>
                  <div className={Styles.gradbox__header}>
                    <Title
                      id='documentos-title'
                      text={project.acronimo === 'CLGT' ? i18next.t("Benefícios entregues") : "Cronograma de Retornos"}
                      hidden={false}
                      size={24}
                      height={24}
                      width={14}
                      weight="normal"
                      color="#404040"
                      className={`${Styles.gradbox__title} mb-0`}
                    />
                  </div>
                  <div className={Styles.gradbox__body}>
                    {project.Remuneracao.map((item: {
                      id: string
                      porcentagemPagaNoMes: string,
                      vencimento: string,
                      idRemuneracao: number,
                    }) => (
                      <QuotaShow
                        key={item.id}
                        project={project}
                        juros={item.porcentagemPagaNoMes}
                        parcela={item.idRemuneracao}
                        valor={'0,00'}
                        vencimento={item.vencimento}
                        badge={{
                          type: "success",
                          message: "Paga"
                        }}
                      />
                    ))}

                  </div>
                </div>
              </Column>
            </Section>

            <Section
              id='emissor'
              label='emissor-title'
              desc='emissor-description'
              justify='start'
              hidden={false}
              className={`${Styles.emissor} d-flex align-items-center`}
            >
              <Column
                media='xl'
                size={6}
                className='position-relative'
              >
                <Separator
                  color="#00EE8D"
                  size={200}
                />
                <Title
                  id='documentos-title'
                  text={languageBrowser !== 'pt-BR' ? i18next.t(Data.emissor.title) : Data.emissor.title}
                  hidden={false}
                  size={48}
                  height={48}
                  width={14}
                  weight="normal"
                  color="#404040"
                  className={`${Styles.documentos__title} mb-4`}
                />
                <Paragrah
                  id='emissor-description'
                  text={project.emissor.descricaoEmissor}
                  className="py-4"
                  color='#000000'
                  hidden={false}
                  width={100}
                  size={18}
                />
                {
                  project.emissor.linkEmissor && (
                    <Button
                      id='emissor-cta'
                      text={languageBrowser !== 'pt-BR' ? i18next.t(Data.emissor.button.text) : Data.emissor.button.text}
                      label={Data.emissor.button.label}
                      hidden={false}
                      disabled={false}
                      onClick={() => {
                        window.open(project.emissor.linkEmissor)
                      }}
                    />
                  )
                }
                {project.emissor.logo && (
                  <Image
                    src={project.emissor.logoUrl}
                    width={200}
                    height={100}
                    alt='SBCrédito logo'
                    className={`${Styles.emissor__logo} img-fluid`}
                  />
                )}
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
                  text={languageBrowser !== 'pt-BR' ? i18next.t(Data.discord.paragraph) : Data.discord.paragraph}
                  className="py-2"
                  color='#000000'
                  hidden={false}
                  width={20}
                  size={18}
                />
                <Button
                  id='discord-cta'
                  text={languageBrowser !== 'pt-BR' ? i18next.t('ACOMPANHE NOSSOS PRÓXIMOS PASSOS') : 'ACOMPANHE NOSSOS PRÓXIMOS PASSOS'}
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
        </main>
      </ModalContext.Provider>
    )
  }
}

export default ProjectPage