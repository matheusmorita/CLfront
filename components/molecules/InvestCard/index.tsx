import Styles from './styles.module.scss'
import Button from '@/components/atoms/Button';
import Image from 'next/image';
import ProgressBar from '../ProgressBar';

import Logo from '@/assets/img/logo.webp';


interface InvestCardInterface {
  text: string;
  id: string;
  hidden: boolean;
  label: string;
  onClick: any;
  src: any;
  alt: string;
  name: string;
  emissor: string;
  acronimo: string;
}

function InvestCard({ text, id, hidden, label, onClick, src, alt, name, emissor, acronimo }: InvestCardInterface) {
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
          <div>
            <h5 style={{ margin: '0' }}>
              {name}
              <span className={Styles.divImgDescription__span}>
                {`#${acronimo}`}
              </span>
            </h5>
            <p>Emitido por <b>{emissor}</b></p>
          </div>
          <ProgressBar
            bgColor='#00EE8D'
            height={10}
            progress='50'
          />
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