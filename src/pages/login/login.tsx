import React, { ChangeEvent, FC, FormEvent } from "react";
import { Link, Redirect, useLocation } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './login.module.css';
import { authorization } from "../../services/actions";
import { useDispatch, useSelector } from "../../services/hooks/redux-hooks";
import { RootState } from "../../utils/types";

interface ILocationState {
    from: {
      pathname: string;
    };
  }
const Login: FC = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((store: RootState) => store.user.isLoggedIn);
    const location = useLocation<ILocationState>();
    const [inputValue, setInputValue] = React.useState({ email: '', password: '' });
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setInputValue({ ...inputValue, [name]: value });
    };
    const handleSubmit = (e: FormEvent) => {
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
                    <PasswordInput name="password" value={inputValue.password} onChange={handleChange} />
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
