import PropTypes from "prop-types";
import style from "./order-details.module.css";
import checkout from "../../../images/checkout.png";
import { FC } from "react";


interface ICompProps {
  thingName: string;
  orderNumber: number;
}

export const OrderDetails: FC<ICompProps> = ({ orderNumber, thingName }) => {
  return (<div>
    <p className={`text text_type_digits-large ${style.number}`}>{orderNumber}</p>
    <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
    <img src={checkout} className={`p-15 ${style.checkout}`} alt={thingName} />
    <p
      data-cy="order-ready-marker"
      className="text text_type_main-default"
    >Ваш заказ начали готовить</p>
    <p className="text text_type_main-default text_color_inactive pt-2 pb-20">
      Дождитесь готовности на орбитальной станции
    </p>
  </div>);
}

// OrderDetails.propTypes = {
//   thingName: PropTypes.string, // title from order response
//   orderNumber: PropTypes.number.isRequired, // order number
// };
