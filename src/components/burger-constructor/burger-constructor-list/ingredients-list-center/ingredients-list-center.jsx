import style from "./ingredients-list-center.module.css";
import { IngredientsListItem } from "./ingredients-list-item/ingredients-list-item";
import { menuItemsList } from "../../../../utils/data.type";


// Нормальной работе dnd уникальный идентификатор позиции в корзине
// не помогает, принципиальным является, что-бы компонент понимал,
// что у него изменился индекс, но поскольку надо uuid, делаем uuid.
// key={item._id + '_' + index} тоже неплохо работало
export function IngredientsListCenter({ items }) {
    return (<ul className={`scroll-box ${style.list} mt-0 mb-0`}>
        {items.map((item, index) => {
            return (
                <IngredientsListItem item={item} index={index} key={item.uniqueId} />
            );
        })}
    </ul>);
}

IngredientsListCenter.propTypes = {
    items: menuItemsList,
};
