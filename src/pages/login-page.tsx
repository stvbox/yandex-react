import { useState, useCallback, useEffect, SyntheticEvent } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { BurgersForm, IInputItem } from "../components/form/burger-form";
import { BurgerSpinner } from "../components/spinner/spinner";
import { Modal } from "../components/modal/modal";
import { Link } from "react-router-dom";
import { RootState, useAppDispatch } from "..";
import { authActions } from "../services/reducers/auth";
import { PayloadAction } from "@reduxjs/toolkit";
import { FetchResponse } from "../utils/requests";
import style from "./login-page.module.css";
import { AuthActions, IAuthResult } from "../services/reducers/auth.types";
import { authUser } from "../services/actions/auth";


export function LoginPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // const [error, setError] = useState<RequestError | null>();

    const { errorMessage, storeEmail, wait } = useSelector((store: RootState) => ({
        errorMessage: store.auth.errorMessage,
        storeEmail: store.auth.email || '',
        wait: store.auth.wait,
    }));

    useEffect(() => {
        if (storeEmail) {
            navigate('/profile');
        }
    });

    // const [wait, setWait] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const inputs: Array<IInputItem> = [
        { name: 'email', placeholder: 'E-mail', type: 'email', setValue: setEmail, value: email },
        { name: 'password', placeholder: 'пароль', type: 'password', setValue: setPassword, value: password },
    ];

    const buttonFormHandler = useCallback(() => {
        dispatch(authUser({ email, password })).then(result => {
            return result as PayloadAction<FetchResponse<IAuthResult>>;
        }).then(result => {
            console.log('dispatchResult(result):', result);
            if (!result.payload) return;

            // storeTokens({ // TODO: перенести в мидлвар
            //     accessToken: result.payload.json.accessToken,
            //     refreshToken: result.payload.json.refreshToken,
            // });

            if (location.state?.goBack) {
                navigate(-1);
                return;
            }

            navigate('/');
        });
    }, [email, password]);

    const closeErrorModalHandler = useCallback(() => {
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
            <BurgersForm title='Вход' inputs={inputs} buttonTitle='Войти' buttonHandler={buttonFormHandler} >
                <p className="text text_type_main-default">
                    Вы — новый пользователь? <Link to='/register' >Зарегистрироваться</Link>
                    {/* <Button htmlType="button" type="secondary" size="medium" >
                        Зарегистрироваться
                    </Button> */}
                </p>
                <p className="text text_type_main-default">
                    Забыли пароль? <Link to='/forgot-password' >Восстановить пароль</Link>
                    {/* <Button htmlType="button" type="secondary" size="medium">
                        Восстановить пароль
                    </Button> */}
                </p>
            </BurgersForm>
        </section>
        {errorMessage && (
            <Modal title="Ошибка авторизации" closeHandler={closeErrorModalHandler}>
                <p className="text text_type_main-medium">
                    {errorMessage}
                </p>
            </Modal>
        )}
    </>);
}
