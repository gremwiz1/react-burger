import React, {FC} from 'react';
import style from './modal-overlay.module.css';

interface IModalOverlay {
    closeModal: () => void
}
const ModalOverlay: FC<IModalOverlay> = ({ children, closeModal }) => {
    function handleClick() {
        closeModal();
    }
    return (
        <section className={style.section}
            onClick={e => (e.currentTarget === e.target) && handleClick()}>
            {children}
        </section>
    )
};

export default ModalOverlay;