import { FC } from "react";
import { OrderDetailsHistory } from "../components/order-details-history/order-details-history";
import { useParams } from "react-router-dom";
import style from "./order-datails-page.module.css";

interface ICompParams {

}

export const OrderDetailsPage: FC<ICompParams> = () => {
    const params = useParams();
    const orderNumber: string = params.orderNumber || "";

    return (<div className={`${style['arange-window']}`}>
        <OrderDetailsHistory orderNumber={orderNumber} isModal={false} />
    </div>);
}