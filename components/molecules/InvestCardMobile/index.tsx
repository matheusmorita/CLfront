import React from 'react';

import Button from '@/components/atoms/Button';

import Styles from './styles.module.scss';

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

function InvestCardMobile({
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
          background: ` linear-gradient(to bottom, transparent, #000), url(${src})`,
          backgroundSize: 'cover',
          position: 'absolute',
          width: '100%',
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
    </div>)}

export default InvestCardMobile;