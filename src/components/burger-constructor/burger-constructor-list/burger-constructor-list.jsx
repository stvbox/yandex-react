import { useDrop, useDrag } from "react-dnd";
import { useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { menuItemsList, menuItem } from "../../../utils/data.type";
import {
  MOVE_CONSTRUCTOR_ITEM,
  INSERT_CONSTRUCTOR_ITEM,
  SET_CONSTRUCTOR_BUN,
  REMOVE_CONSTRUCTOR_ITEM,
} from "../../../services/actions/constructor";
import style from "./burger-constructor-list.module.css";

const TopBottomWords = {
  bottom: 'низ',
  top: 'верх',
};

export function IngredientsList() {

  const { constructorState, ingridients, bun } = useSelector(store => ({
    ingridients: store.ingredients.items,
    categories: store.ingredients.categories,
    constructorState: store.constructor,
    bun: store.constructor.bun,
  }));

  const items = useMemo(() => {
    if (constructorState.burgerSet) {
      return constructorState.burgerSet.map(itemId => {
        return ingridients.find(ingridient => ingridient._id == itemId);
      });
    }
    return [];
  }, [constructorState.burgerSet]);

  const bunItem = useMemo(() => {
    return ingridients.find(_ingredient => _ingredient._id == bun);
  }, [bun]);

  return (
    <div className={`${style.wrapper} pt-25`}>
      <div key={bunItem?._id + '_top'} className={`${style.item} pr-5 pb-0`}>
        <BunComponent bunItem={bunItem} insIndex={0} type="top" />
      </div>
      <IngredientsListCenter items={items} />
      <div key={bunItem?._id + '_bot'} className={`${style.item} pr-5 pb-4`}>
        <BunComponent bunItem={bunItem} insIndex={items.length - 1} type="bottom" />
      </div>
    </div>
  );
};

function IngredientsListCenter({ items }) {
  const [collectedProps, drop] = useDrop(() => ({
    accept: 'toBurgerSet',
    hover(item, monitor) {
      //console.log(item);
    },
  }));

  return (<ul ref={drop} className={`scroll-box ${style.list} mt-0 mb-0`}>
    {items.map((item, index) => {
      return (
        <IngredientsListItem item={item} index={index} key={item._id + index} />
      );
    })}
  </ul>);
}

function IngredientsListItem({ item, index }) {
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

  const border = isOver ? '1px white dashed' : '';
  //const opacity = isDragging ? .3 : 1;
  const opacity = 1;

  drag(drop(ref));

  return (
    <li key={`${item._id}-${index}`} ref={ref} style={{ opacity, border }} className={`${style.item} pr-3 pb-4`}>
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

function BunComponent({ type, bunItem, insIndex }) {
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

  const border = isOver ? '1px white dashed' : '';

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

IngredientsListItem.propTypes = {
  item: menuItem,
  index: PropTypes.number,
}

BunComponent.propTypes = {
  type: PropTypes.oneOf(['top', 'bottom']),
  bunItem: menuItem,
  insIndex: PropTypes.number,
}

IngredientsListCenter.propTypes = {
  items: menuItemsList,
};


function setBun(item, dispatch) {
  //console.log('item._id: ' + item._id);
  dispatch({ type: SET_CONSTRUCTOR_BUN, itemId: item._id });
}

function inserItem(to, item, dispatch) {
  dispatch({ type: INSERT_CONSTRUCTOR_ITEM, to, itemId: item._id });
}

function moveItem(from, to, dispatch) {
  dispatch({ type: MOVE_CONSTRUCTOR_ITEM, from, to });
}

function removeItem(from, dispatch) {
  dispatch({ type: REMOVE_CONSTRUCTOR_ITEM, from });
}
