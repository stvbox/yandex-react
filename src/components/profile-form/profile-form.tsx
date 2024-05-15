import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgersForm, IInputItem } from '../form/burger-form';
import { useNavigate } from 'react-router-dom';
import { SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { BurgerSpinner } from '../spinner/spinner';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../..';
import style from './profile-form.module.css';
import { updateUserInfo } from '../../services/actions/auth';

export function ProfileForm() {
    const dispatch = useAppDispatch();
    //const [wait, setWait] = useState(false);

    const navigate = useNavigate();
    //const dispatch = useDispatch();

    useEffect(() => {
        if (!storeEmail) {
            navigate('/login');
        }
    });

    const { storeName, storeEmail, wait } = useSelector((store: RootState) => ({
        storeEmail: store.auth.email || '',
        storeName: store.auth.name || '',
        wait: store.auth.wait,
    }));

    const [name, setName] = useState(storeName);
    const [login, setLogin] = useState(storeEmail);
    const [password, setPassword] = useState('');

    const isChange = useMemo(() => {
        return storeName != name || storeEmail != login || password.length;
    }, [[name, login, password, storeName, storeEmail]]);

    const inputs: Array<IInputItem> = useMemo(() => [
        { name: 'name', placeholder: 'Имя', type: 'text', setValue: setName, value: name },
        { name: 'login', placeholder: 'Логин', type: 'text', setValue: setLogin, value: login },
        { name: 'password', placeholder: 'Пароль', type: 'password', setValue: setPassword, value: password },
    ], [name, login, password, storeName, storeEmail]);

    const okClickHandler = useCallback(() => {
        dispatch(updateUserInfo({ email: login, password, name }));
    }, [name, login, password, storeName, storeEmail]);

    if (wait) {
        return (
            <section className={style['section-wrapper']} >
                <BurgerSpinner height={134} />
            </section>
        );
    }

    return (<>
        <BurgersForm inputs={inputs} />
        <div className={`${style['buttons-block']}`} >
            <p className={`${style['description']} text text_type_main-default`}>
                В этом разделе вы можете
                изменить свои персональные данные
            </p>
            {isChange ? <>
                <Button htmlType="button" type="secondary" size="medium">
                    Отмена
                </Button>
                <Button onClick={okClickHandler} htmlType="button" type="primary" size="medium">
                    Сохранить
                </Button>
            </> : <></>}
        </div>
    </>);
}