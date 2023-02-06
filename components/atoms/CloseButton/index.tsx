import CloseIcon from '@mui/icons-material/Close';

interface CloseBtnInterface {
  onClick: any
  className: any
}

function CloseButton({ onClick, className }: CloseBtnInterface) {
  return (
    <button
      className={className}
      onClick={onClick}
    >
      <CloseIcon />
    </button>
  )
}

export default CloseButton;

