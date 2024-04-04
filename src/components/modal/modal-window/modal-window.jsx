import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./modal-window.module.css";

export function ModalWindow({ title, children, closeHandler }) {
    const clickInterceptor = (event) => {
        event.stopPropagation();
    };

    return (
        <div onClick={clickInterceptor} className={style.window}>
            <div className={style.header}>
                <p className={`text text_type_main-large ${style.title}`}>{title}</p>
                <div onClick={closeHandler} className={`${style.close} ml-10`}>
                    <CloseIcon type="primary" />
                </div>
            </div>
            {children}
        </div>
    );
}