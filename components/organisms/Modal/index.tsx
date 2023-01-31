import React from "react";
import Styles from './styles.module.scss';

import HeaderModal from "@/components/molecules/HeaderModal";
import InvestCard from "@/components/molecules/InvestCard";

function Modal () {
    const test = ['1','1','1','1','1','1','1','1']

    return (
        <>
            <form className={Styles.form}>
                <HeaderModal />
                <section className={Styles.sectionCard}>
                    {test.map((item, i) => (
                        <InvestCard
                            key={item}
                            text={item}
                            hidden={false}
                            id={`${item} - ${i}`}
                            label='Clique para comprar'
                            onClick={() => {}}
                        />
                    ))}
                </section>
            </form>
            
        </>
    )
}

export default Modal;