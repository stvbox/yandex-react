import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgersForm } from '../form/burger-form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import style from './profile-form.module.css';

export function ProfileForm() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!storeEmail) {
            navigate('/login');
        }
    });

    const { storeName, storeEmail } = useSelector(store => ({
        storeName: store.burgerAuth.name || '',
        storeEmail: store.burgerAuth.email || '',
    }));

    const [name, setName] = useState(storeName);
    const [login, setLogin] = useState(storeEmail);
    const [password, setPassword] = useState('');

    const isChange = useMemo(() => {
        return storeName != name || storeEmail != login || password.length;
    }, [[name, login, password, storeName, storeEmail]]);

    const inputs = useMemo(() => [
        { name: 'name', placeholder: 'Имя', type: 'text', setValue: setName, value: name },
        { name: 'login', placeholder: 'Логин', type: 'text', setValue: setLogin, value: login },
        { name: 'password', placeholder: 'Пароль', type: 'password', setValue: setPassword, value: password },
    ], [name, login, password, storeName, storeEmail]);

    return (<>
        <BurgersForm inputs={inputs} />
        <div className={`${style['buttons-block']}`} >
            <p className={`${style['description']} text text_type_main-default`}>
                В этом разделе вы можете
                изменить свои персональные данные
            </p>
            {isChange && <>
                <Button htmlType="button" type="secondary" size="medium">
                    Отмена
                </Button>
                <Button htmlType="button" type="primary" size="medium">
                    Сохранить
                </Button>
            </>}
        </div>
    </>);
}