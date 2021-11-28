import React from 'react';
import { Typography, Box, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import style from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

function Modal({ title, children, closeModal }) {
    React.useEffect(() => {
        document.addEventListener('keydown', closeESC)
        return () => document.removeEventListener('keydown', closeESC)
    })
    const EscCode = 27;
    function closeESC(evt) {
        if (evt.keyCode === EscCode) {
            closeModal();
        }
    }
    function handleClick() {
        closeModal();
    }
    return (
        <ModalOverlay>
            <section className={style.section}>
                <div className={`${style.container} pl-10 pt-10 pr-10`}>
                    <h3 className="text text_type_main-large">{title}</h3>
                    <CloseIcon type="primary" onClick={handleClick} />
                </div>
                {children}
            </section>
        </ModalOverlay>

    )
};
Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element.isRequired,
    closeModal: PropTypes.func.isRequired
}
export default Modal;