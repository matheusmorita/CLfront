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

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'


// languages
import en from '@/public/locales/en/common.json';
import pt from '@/public/locales/pt/common.json';
import ProjectContext from '@/context/ProjectContext'
import { formatOnlyDate } from '@/utils/formatDate'
import QuotaShowPreview from './QuotaPreview'
import Status from '@/components/atoms/Status'

const ProjectPagePreview = () => {
  const router = useRouter()
  const id = router.query.id
  const [project, setProject] = React.useState<any>()

  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [showMobileModal, setShowMobileModal] = React.useState<boolean>(false)
  const [lengthWindow, setLengthWindow] = React.useState<number>(0)
  const [infoPreview, setInfoPreview] = React.useState<any>();
  const [documentsName, setDocumentsName] = React.useState<any>();

  const [projectSelected, setProjectSelected] = React.useState<any>([]);

  const { projectSelectedContext } = React.useContext(ProjectContext);



  const { t: translate } = useTranslation('project');
  const { locale } = router;
  const t = locale === 'en' ? en : pt


  const { loggedIn } = React.useContext(UserContext)

  const handleGetInfoPreview = () => {
    const infos = sessionStorage.getItem('infoPreview')
    const documents = sessionStorage.getItem('documentsName')

    setInfoPreview(JSON.parse(infos!))
    setDocumentsName(JSON.parse(documents!))
  }


  React.useEffect(() => {

    handleGetInfoPreview()

    // if (!id) return
    // const idProject = localStorage.getItem('idProject')
    // fetchDataIdAxios(idProject, setProject)

    // const largura = window.innerWidth
    // setLengthWindow(largura)

    // const beforePath = sessionStorage.getItem('beforePath')

    // if (beforePath?.includes('projeto')) {
    //   if (largura <= 700) {
    //     sessionStorage.setItem('beforePath', '')
    //     return setShowMobileModal(true)
    //   }
    //   sessionStorage.setItem('beforePath', '')
    //   return setShowModal(true)
    // }

    // const beforePath = localStorage.getItem('beforePath')
    // router.push(`${beforePath}`)
  }, [])

  return (
    <ModalContext.Provider
      value={{
        modalControl: [showModal, setShowModal],
        modalMobileControl: [showMobileModal, setShowMobileModal]
      }}
    >
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
            bgImage={infoPreview?.backgroundURL}
          >
            <Column
              media='lg'
              size={10}
              className="pt-5"
            >
              <Subtitle
                text={infoPreview?.acronimo}
                color="#00EE8D"
              />
              <Title
                id='introducao-title'
                text={translate(infoPreview?.nome)}
                hidden={false}
                size={100}
                height={100}
                width={12}
                weight="normal"
                className={`${Styles.intro__title} mb-4`}
              />
              <Paragrah
                id='introducao-description'
                text={infoPreview?.descricaoBreve}
                hidden={false}
                width={39}
                size={18}
                height={22}
                color="#D3D3D3"
              />
              <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
              <Category
                iconName={"flash-sharp"}
                text={`${infoPreview?.tipoToken}`}
                className="mt-5 mb-5"
              />
              <Status position='relative' className={Styles.spanStatus} text={infoPreview?.benefitStatus} />
              </div>
              <Button
                id="introducao-cta"
                text={t.invest}
                label="Clique e escolha um projeto para investir"
                hidden={false}
                disabled={false}
                size={20}
                onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
                }}
              />
            </Column>
          </Section>

          <TabNavigation
            links={[
              { name: t.about, path: "sobre" },
              { name: t.documents, path: "documentos" },
              { name: t.projectOwnerMenu, path: "emissor" }
            ]}
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
                text={t.aboutTokenTitle}
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
                text={infoPreview?.descricaoLonga}
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
                {infoPreview?.dataLancamento && (
                  <DataShow
                    title={t.launchDate}
                    value={infoPreview?.dataLancamento}
                    badge={{
                      type: "success",
                      message: t.NEW
                    }}
                    contractLink={project?.contratoToken}
                  />
                )}
                {infoPreview?.rentabilidade ? (
                  <DataShow
                    title={t.profitability}
                    value={`${infoPreview?.rentabilidade}% a.a. do CDI ${infoPreview?.benefit ? 'e benefícios' : ''}`} // alterar essa parte
                    badge={{ type: "success", message: t.NEW }}
                    contractLink={project?.contratoToken}
                  />) : (
                  <DataShow
                    title={t.profitability}
                    value={'N/A'}
                    contractLink={project?.contratoToken}
                  />
                )}

                {infoPreview?.numberLote ? (
                  <DataShow
                    title={t.batch}
                    value={infoPreview?.numberLote}
                    badge={{ type: "success", message: t.NEW }}
                    contractLink={project?.contratoToken}
                  />) : (
                  <DataShow
                    title={t.batch}
                    value={'N/A'}
                    contractLink={project?.contratoToken}
                  />)}

                {infoPreview?.tokenValue ? (
                  <DataShow
                    title={t.tokenValue}
                    value={infoPreview?.tokenValue}
                    contractLink={project?.contratoToken}
                  />) : (
                  <DataShow
                    title={t.tokenValue}
                    value={'N/A'}
                    contractLink={project?.contratoToken}
                  />)}

                {infoPreview?.prazoDoLote ? (
                  <DataShow
                    title={t.batchExpiration}
                    value={formatOnlyDate(infoPreview?.prazoDoLote)}
                    contractLink={project?.contratoToken}
                  />) : (
                  <DataShow
                    title={t.batchExpiration}
                    value={'00/00/0000'}
                    contractLink={project?.contratoToken}
                  />)}

                {infoPreview?.qtdTokens ? (
                  <DataShow
                    title={t.totalTokens}
                    value={infoPreview?.qtdTokens}
                    contractLink={project?.contratoToken}
                  />) : (
                  <DataShow
                    title={t.totalTokens}
                    value={'N/A'}
                    contractLink={project?.contratoToken}
                  />)}
                <DataShow
                  title={t.contract}
                  value={'ESTE CAMPO SERÁ GERADO AUTOMATICAMENTE'}
                  highlight={true}
                  badge={{ type: "success", message: t.emphasis }}
                  linkTrue={true}
                  contractLink={project?.contratoToken}
                />
                <DataShow
                  title={t.amountInvest}
                  value={'0%'}
                  highlight={true}
                  badge={{ type: "success", message: t.emphasis }}
                  contractLink={project?.contratoToken}
                />
                {/* {project?.lotes.length > 0 ? (
                  <DataShow
                    title={t.amountInvest}
                    value={'0%'}
                    highlight={true}
                    badge={{ type: "success", message: t.emphasis }}
                    contractLink={project?.contratoToken}
                  />) : (
                  <DataShow
                    title={t.amountInvest}
                    value={'N/A'}
                    highlight={true}
                    badge={{ type: "success", message: t.emphasis }}
                    contractLink={project?.contratoToken}
                  />
                )} */}
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
                text={t.documents}
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
              {documentsName?.map((nameFile: any, i: number) => (
                <DataShow
                  key={`file${i}`}
                  title={t.docTitle}
                  value={nameFile}
                  className="mb-3"
                  badge={{
                    type: "success",
                    message: t.DOCUMENT
                  }}
                  contractLink={project?.contratoToken}
                />
              ))}
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
                    text={project?.acronimo === 'CLGT' ? t.benefitsDelivered : t.returnSchedule}
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
                  <QuotaShowPreview
                    key={'item.id'}
                    project={infoPreview}
                    juros={'item.porcentagemPagaNoMes'}
                    parcela={1}
                    valor={'0,00'}
                    vencimento={'item.vencimento'}
                  />
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
                text={t.projectOwnerMenu}
                hidden={false}
                size={48}
                height={48}
                width={14}
                weight="normal"
                color="#404040"
                className={`${Styles.documentos__title} mb-4`}
              />
              {/* <Paragrah
                id='emissor-description'
                text={project?.emissor.descricaoEmissor}
                className="py-4"
                color='#000000'
                hidden={false}
                width={100}
                size={18}
              /> */}
              {
                project?.emissor.linkEmissor && (
                  <Button
                    id='emissor-cta'
                    text={t.accessTheSite}
                    label={Data.emissor.button.label}
                    hidden={false}
                    disabled={false}
                    onClick={(e: any) => {
                      e.preventDefault();
                    }}
                  />
                )
              }
              {project?.emissor.logo && (
                <Image
                  src={project?.emissor.logoUrl}
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
                text={t.discordNews}
                className="py-2"
                color='#000000'
                hidden={false}
                width={20}
                size={18}
              />
              <Button
                id='discord-cta'
                text={t.nextSteps}
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

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {

  return {
    props: {
      ...(await serverSideTranslations(locale || 'pt-BR', ['project'])),
    },
  }
}

// export async function getStaticProps({ locale }: { locale: string }) {
//   return {
//       props: {
//           ...(await serverSideTranslations(locale, ['project', 'footer']))
//       }
//   }
// }

export default ProjectPagePreview