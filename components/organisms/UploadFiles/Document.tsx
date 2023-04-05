import DivisionBar from "@/components/atoms/Division"
import React from "react"

//styles
import Styles from './styles.module.scss'

//components

import CloseIcon from '@mui/icons-material/Close';

interface Props {
    text: string;
    onClick?: (arg: any) => void;
    allowClose?: boolean;
    id?: string;
}

export default function Document ({text, onClick, allowClose, id}: Props) {
    return (
        <span id={id} onClick={onClick} className={Styles.documentCardStyle}>
            {text} {allowClose ? 'X' : ''}
        </span>
    )
}