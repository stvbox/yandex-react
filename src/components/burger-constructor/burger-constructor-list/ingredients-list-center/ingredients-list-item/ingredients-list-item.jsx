import { useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import { useRef } from "react";
import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "../../burger-constructor-list.module.css";
import { setBun, inserItem, moveItem, removeItem } from "../../../burger-constructor";
import PropTypes from 'prop-types';
import { menuItem } from "../../../../../utils/data.type";

export function IngredientsListItem({ item, index }) {
    const dispatch = useDispatch();
    const ref = useRef(null);

    const [{ isOver }, drop] = useDrop({
        accept: 'toBurgerSet',
        collect(monitor) {
            return {
                isOver: monitor.isOver(),
            }
        },
        drop(item, monitor) {
            if (item.index == -1) {
                if (item.item.type == 'bun') {
                    setBun(item.item, dispatch);
                    return;
                }

                inserItem(index, item.item, dispatch);
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            moveItem(dragIndex, hoverIndex, dispatch);
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'toBurgerSet',
        item: () => {
            return { item, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const border = isOver ? '1px white dashed' : ''; // подсветка при наведение dnd
    //const opacity = isDragging ? .3 : 1;
    //const opacity = 1;

    drag(drop(ref));

    return (
        <li ref={ref} style={{ border }} className={`${style.item} pr-3 pb-4`}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => removeItem(index, dispatch)}
            />
        </li>
    );
}

IngredientsListItem.propTypes = {
    index: PropTypes.number,
    item: menuItem,
}
