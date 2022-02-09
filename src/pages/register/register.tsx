import React, { ChangeEvent, FC, FormEvent } from "react";
import { Link, Redirect, useLocation } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './register.module.css';
import { registration } from "../../services/actions";
import { useDispatch, useSelector } from "../../services/hooks/redux-hooks";
import { RootState } from "../../utils/types";

interface ILocationState {
    from: {
      pathname: string;
    };
  }
const Register: FC = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((store: RootState) => store.user.isLoggedIn);
    const location = useLocation<ILocationState>();
    const [inputValue, setInputValue] = React.useState({ email: '', password: '', name: '' });
    if (isLoggedIn) {
        return <Redirect to={location.state?.from || '/'} />;
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setInputValue({ ...inputValue, [name]: value });
    };
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(registration(inputValue));
    };
    return (
        <section className={style.section}>
            <form className={style.form} onSubmit={handleSubmit}>
                <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
                <Input type="text" placeholder="Имя" name="name" value={inputValue.name} onChange={handleChange} />
                <Input type="email" placeholder="E-mail" name="email" value={inputValue.email} onChange={handleChange} />
                <PasswordInput name="password" value={inputValue.password} onChange={handleChange} />
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
