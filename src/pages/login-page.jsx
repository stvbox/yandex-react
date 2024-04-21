import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { BurgersForm } from "../components/form/burger-form";
import { BurgerSpinner } from "../components/spinner/spinner";
import { Modal } from "../components/modal/modal";
import { Link } from "react-router-dom";
import { authLogin } from "../utils/requests";
import { getUserInfo } from '../services/actions/auth';
import style from "./login-page.module.css";

export function LoginPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState();

    const { storeEmail } = useSelector(store => ({
        storeEmail: store.burgerAuth.email || '',
    }));

    useEffect(() => {
        if (storeEmail) {
            navigate('/profile');
        }
    });

    const [wait, setWait] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const inputs = [
        { name: 'email', placeholder: 'E-mail', type: 'email', setValue: setEmail, value: email },
        { name: 'password', placeholder: 'пароль', type: 'password', setValue: setPassword, value: password },
    ];

    const buttonFormHandler = useCallback((event) => {

        setWait(true);

        authLogin({ email, password }, (response) => {
            setWait(false);
            dispatch(getUserInfo());

            if (location.state?.goBack) {
                navigate(-1);
                return;
            }

            navigate('/');

        }, (error) => {
            setWait(false);
            setError(error);
            //console.log('error: ', error);
        });

    }, [email, password]);

    const closeErrorModalHandler = useCallback((e) => {
        setError(null);
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
        {error && (
            <Modal title="Ошибка получения данных" closeHandler={closeErrorModalHandler}>
                <p className="text text_type_main-medium">
                    {JSON.stringify(error.message)}
                </p>
            </Modal>
        )}
    </>);
}
