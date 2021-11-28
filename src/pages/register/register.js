import React from "react";
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './register.module.css';
import { registration } from "../../services/actions";

function Register() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(store => store.user.isLoggedIn);
    const location = useLocation();
    const [inputValue, setInputValue] = React.useState({ email: '', password: '', name: '' });
    if (isLoggedIn) {
        return <Redirect to={location.state?.from || '/'} />;
    }
    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setInputValue({ ...inputValue, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registration(inputValue));
    };
    return (
        <section className={style.section}>
            <form className={style.form} onSubmit={handleSubmit}>
                <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
                <Input type="text" placeholder="Имя" name="name" value={inputValue.name} onChange={handleChange} />
                <Input type="email" placeholder="E-mail" name="email" value={inputValue.email} onChange={handleChange} />
                <PasswordInput type="password" placeholder="Пароль" name="password" value={inputValue.password} onChange={handleChange} />
                <Button type='primary' size='medium'>Зарегистрироваться</Button>
            </form>
            <div className={`${style.link_container} mt-20`}>
                <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?&nbsp;</p>
                <Link className={`${style.link} text text_type_main-default`} to='/login'>Войти</Link>
            </div>
        </section>
    )
};
export default Register;
