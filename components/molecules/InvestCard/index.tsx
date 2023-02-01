import Styles from './styles.module.scss'
import Button from '@/components/atoms/Button';

interface InvestCardInterface {
  text: string;
  id: string;
  hidden: boolean;
  label: string;
  onClick: any;
}

function InvestCard({ text, id, hidden, label, onClick }: InvestCardInterface) {
  return (
    <div className={Styles.div}>
      <div>LOGO</div>
      <div>
        <h3>Nome do projeto</h3>
        <p>Emitido por <b>Emissor</b></p>
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