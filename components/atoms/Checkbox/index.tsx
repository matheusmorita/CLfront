import React from 'react'

interface CheckboxInterface {
  onClick?: any;
}

// languages
import en from '@/public/locales/en/common.json';
import pt from '@/public/locales/pt/common.json';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Checkbox = ({onClick}: CheckboxInterface) => {
  const router = useRouter();
  const { locale } = router;

  const t = locale === 'en' ? en : pt;
  
  return (
    <div className="form-check my-3">
      <input
        className="form-check-input"
        type="checkbox"
        onChange={() => {}}
        id="flexCheckDefault"
        onClick={onClick}
      />
      <label
        className="form-check-label text-start"
        htmlFor="flexCheckDefault"
      >
        Eu li e concordo com os <Link download locale={'pt'} target='_blank' href='TERMO_DE_USO.pdf'>termos de uso</Link> de dados, <Link download target='_blank' locale={'pt'} href='POLITICA_DE_PRIVACIDADE.pdf'>política de privacidade</Link> e cookies.
        {/* {t.policyPrivacy} */}
      </label>
    </div>
  )
}

export default Checkbox