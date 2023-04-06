import React from "react";

// assets
import backgroundImage from '../../../assets/img/backgroundInvestidor.png';
import logoImage from '@/assets/img/logo.png';

//styles 
import Styles from './styles.module.scss';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface CardProps {
  title: string;
  background: any;
  href: string;
}

export function CardAdmin({ title, background, href }: CardProps) {
  const [backgroundIMG, setBackgroundIMG] = React.useState<any>();

  const router = useRouter();
  const { locale } = router;

  return (
    <main
      className={`${Styles.main}`}
      // style={{
      //   backgroundImage: `url(${background})`
      // }}
    >
      <Link
        href={href}
        locale={locale}
        style={{display: 'flex'}}
      >
        <Image
          alt="Imagem respectiva do card"
          width={380}
          height={100}
          src={background}
          className={Styles.backgroundImage}
        />
        <h3 className={Styles.main__h3}>{title}</h3>
      </Link>
    </main>
  )
}