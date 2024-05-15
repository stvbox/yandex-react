import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import logo from "../../../../logo.svg";
import style from "./checkout-button.module.css";
import { BurgerSpinner } from "../../../spinner/spinner";
import { FC } from "react";


interface ICompProps {
    checkoutOrderHandler: () => any;
    isLoading: boolean;
}

export const CheckoutButton: FC<ICompProps> = ({ isLoading, checkoutOrderHandler }) => {
    return (<>
        {isLoading
            ? <BurgerSpinner />
            : <Button
                onClick={checkoutOrderHandler}
                htmlType="button"
                type="primary"
                size="large"
            >Оформить заказ</Button>}
    </>);
}

// CheckoutButton.propTypes = {
//     isLoading: PropTypes.bool,
//     checkoutOrderHandler: PropTypes.func,
// }
