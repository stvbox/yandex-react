import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, MouseEventHandler, ReactNode, SyntheticEvent } from "react";
import style from "./modal-window.module.css";


interface IModalWindowProps {
    title?: string;
    children: ReactNode;
    closeHandler: MouseEventHandler<HTMLDivElement>;
}

export const ModalWindow: FC<IModalWindowProps> = ({ title, children, closeHandler }) => {
    const clickInterceptor = (event: SyntheticEvent<Element, Event>) => {
        event.stopPropagation();
    };

    return (
        <div
            data-cy="modal-window"
            onClick={clickInterceptor}
            className={style.window}
        >
            <div className={style.header}>
                <p className={`text text_type_main-large ${style.title}`}>{title}</p>
                <div
                    data-cy="modal-window-close"
                    onClick={closeHandler}
                    className={`${style.close} ml-10`}
                >
                    <CloseIcon type="primary" />
                </div>
            </div>
            <div className={style.content} >
                {children}
            </div>
        </div>
    );
}

// ModalWindow.propTypes = {
//     title: PropTypes.string,
//     //children: PropTypes.object,
//     closeHandler: PropTypes.func.isRequired,
// };