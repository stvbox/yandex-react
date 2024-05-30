import { FC } from "react";
import style from "./order-status.module.css";


interface ICompProps {
    statusCode?: string;
}

export const OrderStatus: FC<ICompProps> = ({ statusCode }) => {

    if (statusCode == 'done') {
        return (<span className={style['ready-color']}>Выполнен</span>);
    }
    if (statusCode == 'pending') {
        return (<span>Готовится</span>);
    }
    if (statusCode == 'created') {
        return (<span>Создан</span>);
    }

    return (<>
        <span>{statusCode}</span>
    </>);
}