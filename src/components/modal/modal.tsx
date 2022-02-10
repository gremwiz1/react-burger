import React, {FC} from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

interface IModal {
    title: string,
    closeModal: () => void
}
const Modal: FC<IModal> = ({ title, children, closeModal }) => {
    React.useEffect(() => {
        document.addEventListener('keydown', closeESC)
        return () => document.removeEventListener('keydown', closeESC)
    })
    const EscCode = 27;
    function closeESC(evt: KeyboardEvent) {
        if (evt.keyCode === EscCode) {
            closeModal();
        }
    }
    function handleClick() {
        closeModal();
    }
    return (
        <ModalOverlay closeModal={closeModal}>
            <section className={style.section}>
                <div className={`${style.container} pl-10 pt-10 pr-10`}>
                    <h3 className="text text_type_main-large">{title}</h3>
                    <div className='CloseIcon'>
                    <CloseIcon type="primary" onClick={handleClick} />
                    </div>
                </div>
                {children}
            </section>
        </ModalOverlay>

    )
};

export default Modal;