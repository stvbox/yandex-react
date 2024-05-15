import { SyntheticEvent, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BurgersForm, IInputItem } from "../components/form/burger-form";
import { BurgerSpinner } from "../components/spinner/spinner";
//import { resetPassword } from "../utils/requests";
import style from "./forgot-page.module.css";
import { RootState, useAppDispatch } from "..";
import { useSelector } from "react-redux";
import { resetPassword } from "../services/actions/auth";


export function ForgotPage() {
    const { wait } = useSelector((store: RootState) => ({
        wait: store.auth.wait,
    }));

    const dispatch = useAppDispatch();

    //const [wait, setWait] = useState(false);
    const [email, setEmail] = useState('');

    const inputs: Array<IInputItem> = [
        { name: 'email', placeholder: 'Логин | Укажите e-mail', type: 'email', setValue: setEmail, value: email },
    ];

    const navigate = useNavigate();

    const buttonFormHandler = useCallback((event: SyntheticEvent<Element, Event>) => {
        dispatch(resetPassword({ email })).then(() => {
            localStorage.setItem('sentResetCode', String(true));
            navigate('/reset-password');
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
