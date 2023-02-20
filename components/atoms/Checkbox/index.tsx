import React from 'react'

interface CheckboxInterface {
  onClick?: any;
}

const Checkbox = ({onClick}: CheckboxInterface) => {
  return (
    <div className="form-check my-3">
      <input
        className="form-check-input"
        type="checkbox"
        onChange={() => {}}
        id="flexCheckDefault"
        onClick={onClick}
      />
      <label
        className="form-check-label text-start"
        htmlFor="flexCheckDefault"
      >
        Eu li e concordo com os termos de uso de dados, política de
        privacidade e cookies
      </label>
    </div>
  )
}

export default Checkbox