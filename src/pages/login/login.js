import React from "react";
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './login.module.css';
import { authorization } from "../../services/actions";

function Login() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(store => store.user.isLoggedIn);
    const location = useLocation();
    const [inputValue, setInputValue] = React.useState({ email: '', password: '' });
    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setInputValue({ ...inputValue, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(authorization(inputValue));
    };
    return (<>
        {isLoggedIn ? (
            <Redirect to={location.state?.from || '/'} />
        ) : (
            <section className={style.section}>
                <form className={style.form} onSubmit={handleSubmit}>
                    <h2 className="text text_type_main-medium mb-6">Вход</h2>
                    <Input type="email" placeholder="E-mail" name="email" value={inputValue.email} onChange={handleChange} />
                    <PasswordInput type="password" placeholder="Пароль" name="password" value={inputValue.password} onChange={handleChange} />
                    <Button type='primary' size='medium'>Войти</Button>
                </form>
                <div className={`${style.links} mt-20`}>
                    <div className={`${style.link_container} mb-4`}>
                        <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?&nbsp;</p>
                        <Link className={`text text_type_main-default ${style.link}`} to='/register'>Зарегистрироваться</Link>
                    </div>
                    <div className={style.link_container}>
                        <p className="text text_type_main-default text_color_inactive">Забыли пароль?&nbsp;</p>
                        <Link className={`text text_type_main-default ${style.link}`} to='/forgot-password'>Восстановить пароль</Link>
                    </div>
                </div>
            </section>)}
    </>
    )
};
export default Login;
