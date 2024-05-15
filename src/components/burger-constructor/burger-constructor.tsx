import { BurgerConstructorList } from "./burger-constructor-list/burger-constructor-list";
import { CheckoutPanel } from "./checkout-panel/checkout-panel";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import uuid4 from "uuid4";
import { useSelector } from "react-redux";
import style from './burger-constructor.module.css';
import { IMenuItem } from "../../utils/data.type";
import { RootState } from "../..";
import { ConstructorActions, constructorActions } from "../../services/reducers/constructor";


export interface DragObj {
  item: IMenuItem;
  index: number;
}

export function BurgerConstructor() {
  const dispatch = useDispatch();
  // const ref = useRef(null);

  const { bun, burgerSet } = useSelector((store: RootState) => ({
    burgerSet: store.constructer.burgerSet,
    bun: store.constructer.bun,
  }));

  const [{ isOver }, drop] = useDrop<DragObj, void, { isOver: boolean }>({
    accept: 'toBurgerSet',
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
      };
    },
    drop(dragObj, monitor) {
      if (dragObj.item.type == 'bun') {
        console.log('BurgerConstructor::drop: ', dragObj, ' --- ', dragObj.item._id);
        dispatch(constructorActions[ConstructorActions.SET_CONSTRUCTOR_BUN]({ bunItemId: dragObj.item._id }))
        return;
      }

      dispatch(constructorActions[ConstructorActions.INSERT_CONSTRUCTOR_ITEM]({
        menuItem: { ...dragObj.item, uniqueId: uuid4() },
        to: 0
      }));

      // dispatch({
      //   type: ConstructorActions.INSERT_CONSTRUCTOR_ITEM,
      //   payload: { item: { ...dragObj.item, uniqueId: uuid4() }, to: 0 },
      // });

      //inserItem(0, dragObj.item);
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

// export function setBun(item: IMenuItem) {
//   //console.log('item._id: ' + item._id);
//   store.dispatch({ type: ConstructorActions.SET_CONSTRUCTOR_BUN, itemId: item._id });
// }

// export function inserItem(to: number, item: IMenuItem) {
//   store.dispatch({
//     type: ConstructorActions.INSERT_CONSTRUCTOR_ITEM,
//     payload: {
//       item: { ...item, uniqueId: uuid4() },
//       to,
//     }
//   });
// }

// export function moveItem(from: number, to: number) {
//   store.dispatch({ type: ConstructorActions.MOVE_CONSTRUCTOR_ITEM, from, to });
// }

// export function removeItem(from: number) {
//   store.dispatch({ type: ConstructorActions.REMOVE_CONSTRUCTOR_ITEM, from });
// }
