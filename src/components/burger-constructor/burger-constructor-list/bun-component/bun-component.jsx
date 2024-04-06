import { useDrop } from "react-dnd";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
//import { setBun, inserItem, moveItem, TopBottomWords } from "../../../burger-constructor-list";
import PropTypes from "prop-types";
import { menuItem } from "../../../../utils/data.type";
import { setBun, inserItem, moveItem } from "../../burger-constructor";
import { TopBottomWords } from "../burger-constructor-list";


export function BunComponent({ type, bunItem, insIndex }) {
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

                inserItem(insIndex, item.item, dispatch);
                return;
            }

            const dragIndex = item.index;
            moveItem(dragIndex, insIndex, dispatch);
        },
    });

    const border = isOver ? '1px white dashed' : ''; // подсветка при наведении dnd

    return (bunItem && <div ref={drop(ref)} style={{ border }}>
        <ConstructorElement
            type={type}
            isLocked={true}
            text={`${bunItem.name}(${TopBottomWords[type]})`}
            price={bunItem.price}
            thumbnail={bunItem.image}
        />
    </div>);
}

BunComponent.propTypes = {
    type: PropTypes.oneOf(['top', 'bottom']),
    insIndex: PropTypes.number,
    bunItem: menuItem,
}
