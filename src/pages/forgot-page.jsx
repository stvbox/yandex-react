import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BurgersForm } from "../components/form/burger-form";
import { BurgerSpinner } from "../components/spinner/spinner";
import { resetPassword } from "../utils/requests";
import style from "./forgot-page.module.css";


export function ForgotPage() {

    const [wait, setWait] = useState(false);
    const [email, setEmail] = useState('');

    const inputs = [
        { name: 'email', placeholder: 'Логин | Укажите e-mail', type: 'email', setValue: setEmail, value: email },
    ];

    const navigate = useNavigate();

    const buttonFormHandler = useCallback((event) => {

        setWait(true);

        resetPassword(email, (response) => {
            setWait(false);
            localStorage.setItem('sentResetCode', true);
            navigate('/reset-password');
        }, (error) => {
            setWait(false);
            console.error('error: ', error);
        });

    }, [email]);

    if (wait) {
        return (
            <section className={style['section-wrapper']} >
                <BurgerSpinner height={134} />
            </section>
        );
    }

    return (
        <section className={style['section-wrapper']} >
            <BurgersForm title='Восстановление пароля'
                inputs={inputs}
                buttonTitle='Восстановить'
                buttonHandler={buttonFormHandler} >
                <p className="text text_type_main-default">
                    Вспомнили пароль?
                    <Link to='/login' >Войти</Link>
                </p>
            </BurgersForm>
        </section>
    );
}
