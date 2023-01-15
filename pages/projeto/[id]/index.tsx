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

import * as masks from '@/assets/js/util/masks'



const ProjectPage = () => {
  const router = useRouter()
  const id = router.query.id
  const [project, setProject] = React.useState<any>()

  const fetchData = async () => {
    var data = JSON.stringify({
      id
    });

    var config = {
      method: 'post',
      headers: {
        'X-Parse-Application-Id': 'dR30zBB72X8Hsrquh4DgPWRnJe8Nhd8N8AcQpXVU',
        'X-Parse-REST-API-Key': 'wFa33ak4LMUXxJpFtQbt1qtRaF4ALicVHSzjKFGi',
        'Content-Type': 'application/json'
      },
      body: data
    };

    await fetch('https://parseapi.back4app.com/parse/functions/retornar-projeto-id', config)
      .then(resp => resp.json())
      .then(json => {
        setProject(json.result)
      })
      .catch(error => {
        throw error
      })
  }

  React.useEffect(() => {
    if (!id) return
    fetchData()
  }, [router])

  if (project) {
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
              text={project.Projeto.acronimo}
              color="#00EE8D"
            />
            <Title
              id='introducao-title'
              text={project.Projeto.nome}
              hidden={false}
              size={100}
              height={100}
              width={12}
              weight="normal"
              className={`${Styles.intro__title} mb-4`}
            />
            <Paragrah
              id='introducao-description'
              text={project.Projeto.resumo}
              hidden={false}
              width={39}
              size={18}
              height={22}
              color="#D3D3D3"
            />
            <Category
              iconName={"flash-sharp"}
              text={`${project.Projeto.tipo_token}`}
              className="mt-5 mb-5"
            />
            <Button
              id="header-cta"
              text="Investir"
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

        <TabNavigation
          links={[
            { name: "sobre", path: "sobre" },
            { name: "Documentos", path: "documentos" },
            { name: "Emissor", path: "emissor" }
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
              text={Data.sobre.title}
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
              text={project.Projeto.descricao}
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
              {project.Projeto.createdAt && (
                <DataShow
                  title={"Data de lançamento"}
                  value={masks.getDateMask(project.Projeto.createdAt)}
                  badge={{
                    type: "success",
                    message: "NOVO"
                  }}
                />
              )}
              {project.Projeto.rentabilidade && (
                <DataShow
                  title={"Rentabilidade"}
                  value={project.Projeto.rentabilidade}
                  badge={{
                    type: "success",
                    message: "NOVO"
                  }}
                />
              )}
              {project.Lotes && (
                <DataShow
                  title={"Lote"}
                  value={masks.getLotMask(project.Lotes[0].lote)}
                  badge={{
                    type: "success",
                    message: "NOVO"
                  }}
                />
              )}
              {project.Lotes && (
                <DataShow
                  title={"Valor do Token"}
                  value={masks.getCurrencyMask(project.Lotes[0].valorDoToken)}
                />
              )}
              {project.Lotes && (
                <DataShow
                  title={"Prazo do Lote"}
                  value={masks.getLotPeriodMask(project.Lotes[0].prazoDoLote)}
                />
              )}
              {project.Lotes && (
                <DataShow
                  title={"QTDE de Tokens"}
                  value={masks.getQuantityMask(project.Lotes[0].qtdeDeTokens)}
                />
              )}
              <DataShow
                title={"Contrato"}
                value={"N/A"}
                highlight={true}
                badge={{
                  type: "success",
                  message: "DESTAQUE"
                }}
              />
              <DataShow
                title={"Captação"}
                value={"N/A"}
                highlight={true}
                badge={{
                  type: "success",
                  message: "DESTAQUE"
                }}
              />
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
              text={Data.documentos.title}
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
              title={"Título do doc"}
              value={"NOME_DO_ARQUIVO.PDF"}
              className="mb-3"
              badge={{
                type: "success",
                message: "DOCUMENTO"
              }}
            />
            <DataShow
              title={"Título do doc"}
              value={"NOME_DO_ARQUIVO.PDF"}
              badge={{
                type: "success",
                message: "DOCUMENTO"
              }}
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
                  text={"Remunerações"}
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
                <QuotaShow
                  badge={{
                    type: "success",
                    message: "Paga"
                  }}
                />
                <QuotaShow
                  badge={{
                    type: "success",
                    message: "Paga"
                  }}
                />
                <QuotaShow
                  badge={{
                    type: "success",
                    message: "Paga"
                  }}
                />
                <QuotaShow
                  badge={{
                    type: "success",
                    message: "Paga"
                  }}
                />
                <QuotaShow
                  badge={{
                    type: "success",
                    message: "Paga"
                  }}
                />
                <QuotaShow
                  badge={{
                    type: "success",
                    message: "Paga"
                  }}
                />
                <QuotaShow
                  badge={{
                    type: "success",
                    message: "Paga"
                  }}
                />
                <QuotaShow
                  badge={{
                    type: "success",
                    message: "Paga"
                  }}
                />
                <QuotaShow
                  badge={{
                    type: "success",
                    message: "Paga"
                  }}
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
              text={Data.emissor.title}
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
              text={project.Emissor.descricao}
              className="py-4"
              color='#000000'
              hidden={false}
              width={100}
              size={18}
            />
            <Button
              id='emissor-cta'
              text={Data.emissor.button.text}
              label={Data.emissor.button.label}
              hidden={false}
              disabled={false}
              onClick={() => {
                window.open(Data.emissor.button.path)
              }}
            />
            {project.Emissor.logo && (
              <Image
                src={project.Emissor.logo.url}
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
              text={Data.discord.paragraph}
              className="py-2"
              color='#000000'
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
}

export default ProjectPage