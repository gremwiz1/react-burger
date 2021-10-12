import React from 'react';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';
import typeData from '../../utils/types';
import style from './modal-overlay.module.css';

function ModalOverlay({ closeModal, isIngredient, ingredientModal }) {
    React.useEffect(() => {
        document.addEventListener('keydown', closeESC)
        return () => document.removeEventListener('keydown', closeESC)
    })
    const EscCode = 27;
    function handleClick() {
        closeModal();
    }
    function closeESC(evt) {
        if (evt.keyCode === EscCode) {
            closeModal();
        }
    }
    return (
        <section className={style.section}
            onClick={e => (e.currentTarget === e.target) && handleClick()}>
            <Modal isIngredient={isIngredient} closeModal={closeModal} ingredientModal={ingredientModal} />
        </section>
    )
};
ModalOverlay.propTypes = {
    ingredientModal: PropTypes.shape(typeData),
    closeModal: PropTypes.func.isRequired,
    isIngredient: PropTypes.bool.isRequired
}
export default ModalOverlay;