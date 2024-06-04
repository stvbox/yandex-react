import { useState, useCallback, SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { BurgersForm, IInputItem } from "../components/form/burger-form";
import { BurgerSpinner } from "../components/spinner/spinner";
import style from "./register-page.module.css";
import { RootState, useAppDispatch, useAppSelector } from "..";
import { authActions } from "../services/reducers/auth";
import { Modal } from "../components/modal/modal";
import { AuthActions } from "../services/reducers/auth.types";
import { registerUser } from "../services/actions/auth";


export function RegisterPage() {

    const dispatch = useAppDispatch();

    const { wait, errorMessage } = useAppSelector((store: RootState) => ({
        errorMessage: store.auth.errorMessage,
        wait: store.auth.wait,
    }));

    //const [wait, setWait] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    //registerUser
    const inputs: Array<IInputItem> = [
        { name: 'name', placeholder: 'Имя', type: 'email', setValue: setName, value: name },
        { name: 'email', placeholder: 'E-mail', type: 'email', setValue: setEmail, value: email },
        { name: 'password', placeholder: 'пароль', type: 'password', setValue: setPassword, value: password },
    ];

    //const navigate = useNavigate();

    const buttonFormHandler = useCallback((event: SyntheticEvent<Element, Event>) => {
        dispatch(registerUser({ email, name, password }));
    }, [email, name, password]);

    const closeErrorHandler = useCallback(() => {
        dispatch(authActions[AuthActions.RESET_AUTH_ERROR]());
    }, []);

    if (wait) {
        return (
            <section className={style['section-wrapper']} >
                <BurgerSpinner height={134} />
            </section>
        );
    }

    return (<>
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
        {errorMessage && <Modal title="Ошибка регистрации" closeHandler={closeErrorHandler}>
            {errorMessage}
        </Modal>}
    </>);
}