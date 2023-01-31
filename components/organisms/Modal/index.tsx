import Button from "@/components/atoms/Button";
import Form from "@/components/molecules/Form";
import React from "react";
import Styles from './styles.module.scss';

function Modal () {
    const [checkedButton, SetCheckedButton] = React.useState<string>('comprar')
    return (
        <>
            <form className={Styles.form}>
                <div className={Styles.sellBuy}>
                    <div className={Styles.items}>
                        <div className={Styles.buttons}>
                            {checkedButton === 'comprar' ? (
                                <>
                                    <Button
                                        id="buy"
                                        hidden={false}
                                        className={Styles.buttonSelected}
                                        onClick={(e: React.FormEvent<EventTarget>) => {
                                            e.preventDefault();
                                            SetCheckedButton('comprar')
                                        }}
                                        label="buy button"
                                        text="Comprar"
                                        size={18}
                                    />
                                    <Button
                                        id="sell"
                                        hidden={false}
                                        className={Styles.buttonUnselected}
                                        onClick={(e: React.FormEvent<EventTarget>) => {
                                            e.preventDefault();
                                            SetCheckedButton('vender')
                                        }}
                                        label="sell button"
                                        text="Vender" 
                                        size={18}
                                    />
                                </>
                            ) : (
                                <>
                                    <Button
                                        id="buy"
                                        hidden={false}
                                        className={Styles.buttonUnselected}
                                        onClick={(e: React.FormEvent<EventTarget>) => {
                                            e.preventDefault();
                                            SetCheckedButton('comprar')
                                        }}
                                        label="buy button"
                                        text="Comprar"
                                        size={18}
                                    />
                                    <Button
                                        id="sell"
                                        hidden={false}
                                        className={Styles.buttonSelected}
                                        onClick={(e: React.FormEvent<EventTarget>) => {
                                            e.preventDefault();
                                            SetCheckedButton('vender')
                                        }}
                                        label="sell button"
                                        text="Vender" 
                                        size={18}
                                    />
                                </>
                            )}
                            
                        </div>
                        <b>SALDO: R$00,00</b>
                    </div>
                </div>
                <section>
                    
                </section>
            </form>
            
        </>
    )
}

export default Modal;