import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerSpinner } from "../../../spinner/spinner";
import { FC } from "react";


interface ICompProps {
    checkoutOrderHandler: () => void;
    isLoading: boolean;
}

export const CheckoutButton: FC<ICompProps> = ({ isLoading, checkoutOrderHandler }) => {
    return (<>
        {isLoading
            ? <BurgerSpinner />
            : <Button
                data-cy="checkout-button"
                onClick={checkoutOrderHandler}
                // htmlType="button"
                htmlType="submit"
                type="primary"
                size="large"
            >Оформить заказ</Button>}
    </>);
}

// CheckoutButton.propTypes = {
//     isLoading: PropTypes.bool,
//     checkoutOrderHandler: PropTypes.func,
// }
