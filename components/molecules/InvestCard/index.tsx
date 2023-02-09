import Styles from './styles.module.scss'
import Button from '@/components/atoms/Button';
import Image from 'next/image';
import ProgressBar from '../ProgressBar';

interface InvestCardInterface {
  text?: any;
  id: string;
  hidden?: any;
  label?: any;
  onClick?: any;
  src: any;
  alt: string;
  name: string;
  emissor: string;
  acronimo: string;
  hiddenButton: boolean;
  className?: any;
}

function InvestCard({
  text,
  id,
  hidden,
  label,
  onClick,
  src,
  // alt,
  name,
  emissor,
  acronimo,
  hiddenButton,
  className,
}: InvestCardInterface) {
  return (
    <div className={Styles.projecard}>
      <div 
        style={{
          background: ` linear-gradient(to right, transparent, #000), url(${src})`,
          backgroundSize: 'cover',
          position: 'absolute',
          width: '25%',
          height: '100%',
          left: '0',
          top: '0',
        }} 
        className={Styles.projecard__picture} />
      <div className={Styles.projecard__info}>
        <div className={Styles.info}>
          <h1 className={Styles.info__title}>{name}<span>#{acronimo}</span></h1>
          <p className={Styles.info__tiny}>Emitido por <b>{emissor}</b></p>
          {/* Progress component */}
          <div className={Styles.progress}>
            <div className={Styles.progress__values}>
              <span>R$ 217.563.232,11</span>
              <span>R$ 302.562.132,18</span>
            </div>
            <div className={Styles.progress__bar} />
          </div>
        </div>
      </div>
      {!hiddenButton ? (
        <Button
        hidden={hidden}
        id={id}
        label={label}
        onClick={onClick}
        text={text}
        className={className}
      />
      ) : ''}
    </div>




    // <div className={className}>
    //   <div className={Styles.divImgDescription}>
    //     <Image
    //       src={src}
    //       alt={alt}
    //       width={150}
    //       height={110}
    //       className={Styles.projectImage}
    //     />
    //     <div className={Styles.divImgDescription__letters}>
    //       <div>
    //         <h5 style={{ margin: '0' }}>
    //           {name}
    //           <span className={Styles.divImgDescription__span}>
    //             {`#${acronimo}`}
    //           </span>
    //         </h5>
    //         <p>Emitido por <b>{emissor}</b></p>
    //       </div>
    //       <ProgressBar
    //         bgColor='#00EE8D'
    //         height={10}
    //         progress='50'
    //       />
    //     </div>
    //   </div>      
    // </div>
  )
}

export default InvestCard;