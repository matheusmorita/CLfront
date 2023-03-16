import Logo from '@/assets/img/logo.png'
import Image from 'next/image'
import { useRouter } from 'next/router';

// languages
import en from '@/public/locales/en/common.json';
import pt from '@/public/locales/pt/common.json';

export default function Custom404() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : pt;

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <Image
          alt='logo Image'
          src={Logo}
          width={300}
        />
        <h1 style={{
          fontSize: '10rem',
          color: '#00F383'
        }}>404</h1>
      </div>
      <h2 style={{fontSize: '4rem'}}>{t.nothingToSee}</h2>
    </main>
  )
}