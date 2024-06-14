import { useDrop } from "react-dnd";
import { FC, useRef } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { IMenuItem } from "../../../../utils/data.type";
import { DragObj } from "../../burger-constructor";
import { ConstructorActions, constructorActions } from "../../../../services/reducers/constructor";
import uuid4 from "uuid4";
import { useAppDispatch } from "../../../..";

type TopOrButtom = "top" | "bottom";

interface ICompProps {
    bunItem: IMenuItem | null;
    insIndex: number;
    type: TopOrButtom;
}

export const TopBottomWords = {
    bottom: 'низ',
    top: 'верх',
};

export const BunComponent: FC<ICompProps> = ({ type, bunItem, insIndex }) => {
    const dispatch = useAppDispatch();
    const ref = useRef(null);

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
                    dispatch(constructorActions[ConstructorActions.SET_CONSTRUCTOR_BUN]({ bunItemId: dragObj.item._id }))
                    return;
                }

                dispatch(constructorActions[ConstructorActions.INSERT_CONSTRUCTOR_ITEM]({
                    menuItem: { ...dragObj.item, uniqueId: uuid4() },
                    to: insIndex,
                }));

                return;
            }

            dispatch(constructorActions[ConstructorActions.MOVE_CONSTRUCTOR_ITEM]({
                from: dragObj.index,
                to: insIndex,
            }));
        },
    });

    const border = isOver ? '1px white dashed' : ''; // подсветка при наведении dnd

    const dropRef = drop(ref);

    return (bunItem &&
        <div
            data-cy={`constructor-item-${type}`}
            ref={dropRef as any}
            style={{ border }}
        >
            <ConstructorElement
                type={type}
                isLocked={true}
                text={`${bunItem.name}(${TopBottomWords[type]})`}
                price={bunItem.price}
                thumbnail={bunItem.image}
            />
        </div>
    );
}

// BunComponent.propTypes = {
//     type: PropTypes.oneOf(['top', 'bottom']),
//     insIndex: PropTypes.number,
//     bunItem: menuItem,
// }
