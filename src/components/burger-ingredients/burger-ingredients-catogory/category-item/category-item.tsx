import { FC, useCallback } from "react";
import { IMenuItem } from "../../../../utils/data.type";
import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useNavigate } from "react-router-dom";
import style from "./catogory-item.module.css";


interface ICompParams {
    item: IMenuItem;
    count: number;
    index: number;
}

export const BurgerIngredientsCategoryItem: FC<ICompParams> = ({ item, count, index }) => {
    const navigate = useNavigate();

    const [collected, drag] = useDrag(() => ({
        type: 'toBurgerSet',
        item: () => {
            return { item, index: -1 };
        },
    }));

    const clickIngridientHandler = useCallback((ingridient: IMenuItem) => {
        navigate(`/ingredients/${ingridient._id}`, {
            state: { background: true, ingridientId: ingridient._id },
        });
    }, []);

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

// BurgerIngredientsCategoryItem.propTypes = {
//     item: menuItem,
//     count: PropTypes.number,
//     index: PropTypes.number,
// };
