import React from 'react'
import Frame from '../../../templates/Frame'

import Styles from './styles.module.scss'
import { useRouter } from 'next/router'

const RevogarEmail = () => {
  const router = useRouter()
  const hash = router.query.hash

  return (
    <Frame
      id={`revogar-${hash}`}
      role='main'
      label='Página de cancelar assinatura'
    >

    </Frame>
  )
}

export default RevogarEmail