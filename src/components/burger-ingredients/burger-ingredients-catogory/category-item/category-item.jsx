import { useCallback } from "react";
import { menuItem } from "../../../../utils/data.type";
import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { SET_CURRENT_INGRIDIENT } from "../../../../services/actions/ingridients";
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import style from "./catogory-item.module.css";

export function BurgerIngredientsCategoryItem({ item, count, index }) {

    const dispatch = useDispatch();

    const [collected, drag] = useDrag(() => ({
        type: 'toBurgerSet',
        item: () => {
            return { item, index: -1 };
        },
    }));

    const clickIngridientHandler = useCallback((ingridient) => {
        dispatch({ type: SET_CURRENT_INGRIDIENT, payload: ingridient });
    });

    return (<li
        ref={drag}
        onClick={() => clickIngridientHandler(item)}
        className={`m-3 ml-2 mb-8 ${style.item}`}
        key={item._id + '_' + index}
    >
        <div className={style.image}>
            <img src={item.image} alt={item.name} />
        </div>
        <p className={`text text_type_digits-default m-1`}>
            {item.price} &nbsp; <CurrencyIcon type="primary" />
        </p>
        <p className={`text text_type_main-default ${style.name}`}>
            {item.name}
        </p>
        {count && (<Counter count={count} size="default" extraClass="m-1" />)}
    </li>);
}

BurgerIngredientsCategoryItem.propTypes = {
    item: menuItem,
    count: PropTypes.number,
    index: PropTypes.number,
};
