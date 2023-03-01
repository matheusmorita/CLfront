import Button from '@/components/atoms/Button'
import React from 'react'
import Styles from './styles.module.scss'

// languages
import en from '@/public/locales/en/common.json';
import pt from '@/public/locales/pt/common.json';
import { useRouter } from 'next/router';
import ModalContext from '@/context/ModalContext';
import MobileModal from '@/components/organisms/MobileModal';
import Modal from '@/components/organisms/Modal';
import Link from 'next/link';

type Props = {
  options: Array<string>,
  setState: any,
}

const Switch = ({ options, setState }: Props) => {
  const [activeOption, setActiveOption] = React.useState<number>(0)
  const [lengthWindow, setLengthWindow] = React.useState<number>(0)

  const router = useRouter();

  const { locale } = router;

  const t = locale === 'en' ? en : pt;

  const handleActivateOption = (option: number) => {
    setActiveOption(option)
    setState(option)
  }

  const handleActiveClass = (option: number) => {
    return activeOption === option ? Styles.active : undefined
  }

  React.useEffect(() => {
    const largura = window.innerWidth
    setLengthWindow(largura)
  }, [])

  return (
    <div className={Styles.switch}>
      <div style={{display: 'flex'}}>
        <div
          onClick={() => { handleActivateOption(0) }}
          className={`${Styles.switch__option} ${handleActiveClass(0)}`}>
          {options[0]}
        </div>
        <div
          onClick={() => { handleActivateOption(1) }}
          className={`${Styles.switch__option} ${handleActiveClass(1)}`}>
          {options[1]}
        </div>
      </div>
      <Link href='/#projetos' locale={locale}>
      <Button
        id="introducao-cta"
        text={t.invest}
        label="Clique e escolha um projeto para investir"
        hidden={false}
        className={Styles.investButton}
        disabled={false}
        size={20}
        onClick={() => {}}
      />
      </Link>
      
    </div>
  )
}

export default Switch