import React from 'react';
import { Typography, Box, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import style from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useDispatch } from 'react-redux';
import { CLOSE_MODAL_ORDER, CLOSE_MODAL_INGREDIENT } from '../../services/actions/index';

function Modal({ title, children }) {
    const dispatch = useDispatch();
    React.useEffect(() => {
        document.addEventListener('keydown', closeESC)
        return () => document.removeEventListener('keydown', closeESC)
    })
    const EscCode = 27;
    function closeESC(evt) {
        if (evt.keyCode === EscCode) {
            dispatch({ type: CLOSE_MODAL_ORDER });
            dispatch({ type: CLOSE_MODAL_INGREDIENT });
        }
    }
    function handleClick() {
        dispatch({ type: CLOSE_MODAL_ORDER });
        dispatch({ type: CLOSE_MODAL_INGREDIENT });
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
    children: PropTypes.element.isRequired
}
export default Modal;