import React from 'react';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';
import typeData from '../../utils/types';
import style from './modal-overlay.module.css';

function ModalOverlay({ closeModal, children }) {
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
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
}
export default ModalOverlay;