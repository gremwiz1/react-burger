import React from 'react';
import PropTypes from 'prop-types';
import style from './modal-overlay.module.css';

function ModalOverlay({ children, closeModal }) {
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
ModalOverlay.propTypes = {
    children: PropTypes.element.isRequired,
    closeModal: PropTypes.func.isRequired
}
export default ModalOverlay;