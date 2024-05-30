import { FC, useCallback } from "react";
import { Modal } from "../modal/modal";
import { OrderDetailsHistory } from "../order-details-history/order-details-history";
import { useNavigate } from "react-router-dom";


interface ICompProps {
    orderNumber: string;
}

export const OrderDetailsModal: FC<ICompProps> = ({ orderNumber }) => {
    const navigate = useNavigate();

    console.log('123');

    const closeHandler = useCallback(() => {
        navigate(-1);
    }, []);

    return (
        <Modal title={`Детали заказа #${orderNumber}`} closeHandler={closeHandler}>
            <OrderDetailsHistory orderNumber={orderNumber} isModal={true} />
        </Modal>
    );
};