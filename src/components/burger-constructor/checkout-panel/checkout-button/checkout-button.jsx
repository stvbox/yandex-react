import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import logo from "../../../../logo.svg";
import style from "./checkout-button.module.css";


export function CheckoutButton({ isLoading, checkoutOrderHandler }) {
    return (<>
        {isLoading
            ? <img src={logo} className={style.spinner} alt="spinner" />
            : <Button
                onClick={checkoutOrderHandler}
                htmlType="button"
                type="primary"
                size="large"
            >Оформить заказ</Button>}
    </>);
}

CheckoutButton.propTypes = {
    isLoading: PropTypes.bool,
    checkoutOrderHandler: PropTypes.func,
}