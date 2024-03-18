import { PropTypes } from "prop-types";
import style from "./order-details.module.css";
import checkout from "../../../images/checkout.png";

function OrderDetails() {
  return (
    <>
      <p className={`text text_type_digits-large ${style.number}`}>034536</p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img src={checkout} className={`p-15 ${style.checkout}`} alt="checkout" />
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive pt-2 pb-20">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}

OrderDetails.propTypes = {
  closeHandler: PropTypes.func.isRequired,
};

export default OrderDetails;
