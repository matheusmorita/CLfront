import React from 'react'
import QuemSomos from './quem-somos'
import '../src/i18n'

import { useRouter } from 'next/router'
import Link from 'next/link'

const Home = () => {
  const { locale, locales, push } = useRouter();

  return <QuemSomos />
}

export default Home