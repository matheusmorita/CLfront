import React from 'react';

import Styles from './styles.module.scss';

import LanguageIcon from '@mui/icons-material/Language';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Language() {
  const [showLanguages, setShowLanguages] = React.useState<boolean>(false);

  const router = useRouter();
  const { locale, locales, asPath } = router;

  return (
    <main className={Styles.main}>
      <LanguageIcon onClick={() => setShowLanguages(!showLanguages)} className={Styles.languageIcon} />
      <div style={{
        borderBottom: '2px solid #00EE8D',
        visibility: showLanguages ? 'visible' : 'hidden',
        opacity: showLanguages ? '1' : '0',
      }} className={Styles.language}>
        {locales?.map(l => {
          return (
            <div className={Styles.language__item} key={l}>
              <Link
                className={Styles.language__link}
                href={asPath}
                key={l}
                locale={l}
              >
                <b className={Styles.language__languageItem}>
                  {l.toLocaleUpperCase()}
                </b>
              </Link>
            </div>
          )
        })}
      </div>
    </main>
  )
}