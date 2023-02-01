import Styles from './styles.module.scss'
import Button from '@/components/atoms/Button';
import Image from 'next/image';

interface InvestCardInterface {
  text: string;
  id: string;
  hidden: boolean;
  label: string;
  onClick: any;
  src: string;
  alt: string;
  name: string;
  emissor: string;
}

function InvestCard({ text, id, hidden, label, onClick, src, alt, name, emissor }: InvestCardInterface) {
  return (
    <div className={Styles.div}>
      <div className={Styles.divImgDescription}>
        <Image
          src={src}
          alt={alt}
          width={150}
          height={105}
          className={Styles.projectImage}
        />
        <div className={Styles.divImgDescription__letters}>
          <h4>{name}</h4>
          <p>Emitido por <b>{emissor}</b></p>
        </div>
      </div>
      <Button
        hidden={hidden}
        id={id}
        label={label}
        onClick={onClick}
        text={text}
      />
    </div>
  )
}

export default InvestCard;