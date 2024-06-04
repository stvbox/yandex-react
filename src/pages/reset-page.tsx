import { useState, useCallback, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { BurgerSpinner } from "../components/spinner/spinner";
import { Link } from "react-router-dom";
import { BurgersForm, IInputItem } from "../components/form/burger-form";
//import { changePassword } from "../utils/requests";
import style from "./reset-page.module.css";
import { RootState, useAppSelector } from "..";


export function ResetPage() {
    const { wait } = useAppSelector((store: RootState) => ({
        wait: store.auth.wait,
    }));

    const navigate = useNavigate();

    if (!localStorage.getItem('sentResetCode')) {
        navigate('/forgot-password');
    }

    //const [wait, setWait] = useState(false);
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const inputs: Array<IInputItem> = [
        { name: 'password', placeholder: 'Введите новый пароль', type: 'password', setValue: setPassword, value: password },
        { name: 'token', placeholder: 'Введите код из письма', type: 'text', setValue: setToken, value: token },
    ];

    //changePassword(params, okHandler, failHandler)

    const buttonFormHandler = useCallback((event: SyntheticEvent<Element, Event>) => {
        
        // setWait(true);
        // changePassword({ password, token }, (response) => {
        //     setWait(false);
        //     localStorage.removeItem('sentResetCode');
        //     navigate('/login');
        // }, (error) => {
        //     setWait(false);
        //     console.log('error: ', error);
        // });

    }, [password, token]);

    if (wait) {
        return (
            <section className={style['section-wrapper']} >
                <BurgerSpinner height={134} />
            </section>
        );
    }

    return (
        <section className={style['section-wrapper']} >
            <BurgersForm title='Восстановление пароля' inputs={inputs} buttonTitle='Сохранить' buttonHandler={buttonFormHandler} >
                <p className="text text_type_main-default">
                    Вспомнили пароль?
                    <Link to='/login' >Войти</Link>
                </p>
            </BurgersForm>
        </section>
    );
}
