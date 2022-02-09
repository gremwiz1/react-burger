import React, {ChangeEvent, FC, FormEvent} from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './user-profile.module.css';
import { changeUserProfile } from '../../services/actions';
import { useDispatch, useSelector } from '../../services/hooks/redux-hooks';
import { RootState } from '../../utils/types';

const UserProfile: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((store: RootState) => store.user);
    const [isChangeField, setIsChangeField] = React.useState(false);
    const [inputValue, setInputValue] = React.useState({ email: '', password: '', name: '' });
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setInputValue({ ...inputValue, [name]: value });
    };
    const handleReset = (e: FormEvent) => {
        e.preventDefault();
        setInputValue({
            email: user.email,
            password: '',
            name: user.name
        });
    }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(changeUserProfile(inputValue));
    };
    React.useEffect(() => {
        if (inputValue.email !== user.email || inputValue.password !== "" || inputValue.name !== user.name) {
            setIsChangeField(true)
        }
        else {
            setIsChangeField(false)
        }
    }, [inputValue, user]);
    React.useEffect(() => {
        setInputValue({
            email: user.email,
            password: '',
            name: user.name
        })
    }, [user]);
    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <Input type="text" placeholder="Имя" name="name" value={inputValue.name} onChange={handleChange} icon='EditIcon' />
            <Input type="email" placeholder="Логин" name="email" value={inputValue.email} onChange={handleChange} icon='EditIcon' />
            <PasswordInput name="password" value={inputValue.password} onChange={handleChange} />
            {isChangeField ?
                <>
                    <Button type='secondary' size='medium' onClick={handleReset}>Отмена</Button>
                    <Button type='primary' size='medium'>Сохранить</Button>
                </>
                :
                ""}
        </form>
    )
};
export default UserProfile;