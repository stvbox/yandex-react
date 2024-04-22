import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BurgersForm } from "../components/form/burger-form";
import { BurgerSpinner } from "../components/spinner/spinner";
import { registerUser } from "../utils/requests";
import style from "./register-page.module.css";


export function RegisterPage() {

    const [wait, setWait] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    //registerUser
    const inputs = [
        { name: 'name', placeholder: 'Имя', type: 'email', setValue: setName, value: name },
        { name: 'email', placeholder: 'E-mail', type: 'email', setValue: setEmail, value: email },
        { name: 'password', placeholder: 'пароль', type: 'password', setValue: setPassword, value: password },
    ];

    const navigate = useNavigate();

    const buttonFormHandler = useCallback((event) => {

        setWait(true);

        registerUser({ email, name, password }, (response) => {
            setWait(false);
            console.log('response: ', response);
            navigate('/');
        }, (error) => {
            setWait(false);
            console.log('error: ', error);
        });

    }, [email, name, password]);

    if (wait) {
        return (
            <section className={style['section-wrapper']} >
                <BurgerSpinner height={134} />
            </section>
        );
    }

    return (
        <section className={style['section-wrapper']} >
            <BurgersForm title='Регистрация'
                inputs={inputs}
                buttonTitle='Зарегистрироваться'
                buttonHandler={buttonFormHandler}>
                <p className="text text_type_main-default">
                    Уже зарегистрированы?
                    <Link to='/login' >Войти</Link>
                </p>
            </BurgersForm>
        </section>
    );
}