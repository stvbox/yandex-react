import { useDrop, useDrag } from "react-dnd";
import { FC, useCallback, useRef } from "react";
import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "../../burger-constructor-list.module.css";
import { DragObj } from "../../../burger-constructor";
import { IMenuItem } from "../../../../../utils/data.type";
import { ConstructorActions, constructorActions } from "../../../../../services/reducers/constructor";
import uuid4 from "uuid4";
import { useAppDispatch } from "../../../../..";


interface ICompProps {
    item: IMenuItem;
    index: number;
}

export const IngredientsListItem: FC<ICompProps> = ({ item, index }) => {
    const dispatch = useAppDispatch();
    const ref = useRef(null);

    const removeItem = useCallback((from: number) => {
        dispatch(constructorActions[ConstructorActions.REMOVE_CONSTRUCTOR_ITEM]({ from }));
    }, []);

    const [{ isOver }, drop] = useDrop<DragObj, any, { isOver: boolean }>({
        accept: 'toBurgerSet',
        collect(monitor) {
            return {
                isOver: monitor.isOver(),
            }
        },
        drop(dragObj, monitor) {
            if (dragObj.index == -1) {
                if (dragObj.item.type == 'bun') {
                    console.log('asdfawefasdfaefa');
                    dispatch(constructorActions[ConstructorActions.SET_CONSTRUCTOR_BUN]({ bunItemId: dragObj.item._id }));
                    return;
                }

                dispatch(constructorActions[ConstructorActions.INSERT_CONSTRUCTOR_ITEM]({
                    menuItem: { ...dragObj.item, uniqueId: uuid4() },
                    to: index
                }));

                return;
            }

            dispatch(constructorActions[ConstructorActions.MOVE_CONSTRUCTOR_ITEM]({
                from: dragObj.index,
                to: index,
            }));

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
                handleClose={() => removeItem(index)}
            />
        </li>
    );
}

// IngredientsListItem.propTypes = {
//     index: PropTypes.number,
//     item: menuItem,
// }
