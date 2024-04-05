import { BurgerConstructorList } from "./burger-constructor-list/burger-constructor-list";
import { CheckoutPanel } from "./checkout-panel/checkout-panel";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import uuid4 from "uuid4";
import {
  MOVE_CONSTRUCTOR_ITEM,
  INSERT_CONSTRUCTOR_ITEM,
  SET_CONSTRUCTOR_BUN,
  REMOVE_CONSTRUCTOR_ITEM,
} from "../../services/actions/constructor";
import { useSelector } from "react-redux";
import style from './burger-constructor.module.css';

export function BurgerConstructor() {
  const dispatch = useDispatch();
  //const ref = useRef(null);

  const { bun, burgerSet } = useSelector(store => ({
    bun: store.burgerConstructor.bun,
    burgerSet: store.burgerConstructor.burgerSet,
  }));

  const [{ isOver }, drop] = useDrop({
    accept: 'toBurgerSet',
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
      }
    },
    drop(item, monitor) {
      if (item.item.type == 'bun') {
        setBun(item.item, dispatch);
        return;
      }

      inserItem(0, item.item, dispatch);
      return;
    },
  });

  //drop(ref);

  return ((burgerSet && burgerSet?.length || bun) ? (<>
    <BurgerConstructorList />
    <CheckoutPanel />
  </>) : (
    <div className={`${style.wrapper} pt-25`}>
      <div ref={drop} className={`${isOver && style.light}`} >
        <p className={`text text_type_main-large ${style['drop-box']}`}>
          Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа
        </p>
      </div>
    </div>
  ));

};

export function setBun(item, dispatch) {
  //console.log('item._id: ' + item._id);
  dispatch({ type: SET_CONSTRUCTOR_BUN, itemId: item._id });
}

export function inserItem(to, item, dispatch) {
  dispatch({
    type: INSERT_CONSTRUCTOR_ITEM,
    item: { ...item, uniqueId: uuid4() },
    to,
  });
}

export function moveItem(from, to, dispatch) {
  dispatch({ type: MOVE_CONSTRUCTOR_ITEM, from, to });
}

export function removeItem(from, dispatch) {
  dispatch({ type: REMOVE_CONSTRUCTOR_ITEM, from });
}
