import React from 'react';
import PropTypes from 'prop-types';
import style from './modal-overlay.module.css';
import { useDispatch } from 'react-redux';
import { CLOSE_MODAL_ORDER, CLOSE_MODAL_INGREDIENT } from '../../services/actions/index';

function ModalOverlay({ children }) {
    const dispatch = useDispatch();
    function handleClick() {
        dispatch({ type: CLOSE_MODAL_ORDER });
        dispatch({ type: CLOSE_MODAL_INGREDIENT });
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