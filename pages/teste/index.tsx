import React from 'react';
import Link from 'next/link';

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useRouter } from "next/router";

export default function Teste() {
    const { t } = useTranslation('teste')

    return (
        <>
            {/* <h1>locale: {locale}</h1> */}
            <h1>{t('Componente teste')}</h1>
            {/* <h2>
                {
                    locales?.map(l => {
                        return (
                            <Link href={'/teste'} key={l} locale={l}>{l}</Link>)
                    })}
            </h2> */}
        </>
    )
}

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['teste']))
        }
    }
}