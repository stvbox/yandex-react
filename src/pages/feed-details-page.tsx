import { useLocation, useParams } from "react-router-dom";
import { OrderDetailsHistory } from "../components/order-details-history/order-details-history";
import style from "./feed-dateils.module.css";


export const FeedDetailsPage = () => {
    const params = useParams();
    const orderNumber: string = params.orderNumber || "";

    return (<div className={`${style['arange-window']}`}>
        <OrderDetailsHistory orderNumber={orderNumber} isModal={false} />
    </div>);
}