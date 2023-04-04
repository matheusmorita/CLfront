import React, { ChangeEvent } from 'react';
import SimpleInput from "@/components/organisms/SimpleInput";

//styles
import Styles from './styles.module.scss';
import GenericInputCheckbox from '@/components/atoms/GenericInputCheckbox';
import { NumericFormat } from 'react-number-format';

interface Props {
  type: string;
  id: string;
  text?: string;
  label?: string;
  onChange?: any;
  placeholder?: string;
  disabled?: boolean;
}

export default function GenericInputInfo({ type, id, text, label, onChange, placeholder, disabled }: Props) {
  return (
    <div className={Styles.mainDiv}>
      <span className={disabled ? Styles.spanTextDisabled : Styles.spanText}>{text}</span>
      {type === 'checkbox' ? (
        <GenericInputCheckbox
          id={id}
          text={label}
          onChange={onChange}
          disabled={disabled}
        />
      ) : (
        type === 'number' ? (
          <NumericFormat
            className={Styles.inputStyle}
            id={id}
            onChange={onChange}
            placeholder={placeholder}
            thousandSeparator='.'
            decimalSeparator=','
            decimalScale={2}
            fixedDecimalScale={true}
            disabled={disabled}
          />
        ) : (
          <SimpleInput
            className={Styles.inputStyle}
            id={id}
            type={type}
            label={label}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
          />
        )
      )}

    </div>)
}