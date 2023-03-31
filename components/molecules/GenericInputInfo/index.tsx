import React from 'react';
import SimpleInput from "@/components/organisms/SimpleInput";

//styles
import Styles from './styles.module.scss';
import GenericInputCheckbox from '@/components/atoms/GenericInputCheckbox';

interface Props {
    type: string;
    id: string;
    text?: string;
    label?: string;
}

export default function GenericInputInfo({ type, id, text, label }: Props) {
    return (
        <div className={Styles.mainDiv}>
            <span className={Styles.spanText}>{text}</span>
            {type === 'checkbox' ? (
                <GenericInputCheckbox
                    id={id}
                    text={label}
                />
            ) : (
                <SimpleInput
                    className={Styles.inputStyle}
                    id={id}
                    type={type}
                    label={label}
                />
            )}

        </div>)
}