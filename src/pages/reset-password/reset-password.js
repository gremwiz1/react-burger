import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './reset-password.module.css';
import { resetPassword } from "../../services/actions";

function ResetPassword() {
    const dispatch = useDispatch();
    const isForgotPassword = useSelector(store => store.user.isForgotPassword);
    const isResetPassword = useSelector(store => store.user.isResetPassword);
    const [inputValue, setInputValue] = React.useState({ password: '', token: '' });
    if (isResetPassword) {
        return <Redirect to='/login' />;
    }
    if (!isForgotPassword && !isResetPassword) {
        return <Redirect to='/forgot-password' />;
    }
    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setInputValue({ ...inputValue, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(inputValue));
    };
    return (
        <section className={style.section}>
            <form className={style.form} onSubmit={handleSubmit}>
                <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
                <PasswordInput type="password" placeholder="Введите новый пароль" name="password" value={inputValue.password} onChange={handleChange} size={'default'} />
                <Input type="text" placeholder="Введите код из письма" name="token" value={inputValue.token} onChange={handleChange} size={'default'} />
                <Button type='primary' size='medium'>Сохранить</Button>
            </form>
            <div className={`${style.link_container} mt-20`}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?&nbsp;</p>
                <Link className={`${style.link} text text_type_main-default`} to='/login'>Войти</Link>
            </div>
        </section>
    )
};
export default ResetPassword;
