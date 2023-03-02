import React from 'react'

interface CheckboxInterface {
  onClick?: any;
}

// languages
import en from '@/public/locales/en/common.json';
import pt from '@/public/locales/pt/common.json';
import { useRouter } from 'next/router';

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
        {t.policyPrivacy}
      </label>
    </div>
  )
}

export default Checkbox