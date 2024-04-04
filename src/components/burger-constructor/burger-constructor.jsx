import { BurgerConstructorList } from "./burger-constructor-list/burger-constructor-list";
import { CheckoutPanel } from "./checkout-panel/checkout-panel";
import {
  MOVE_CONSTRUCTOR_ITEM,
  INSERT_CONSTRUCTOR_ITEM,
  SET_CONSTRUCTOR_BUN,
  REMOVE_CONSTRUCTOR_ITEM,
} from "../../services/actions/constructor";

export function BurgerConstructor() {
  return (
    <>
      <BurgerConstructorList />
      <CheckoutPanel />
    </>
  );
};

export function setBun(item, dispatch) {
  //console.log('item._id: ' + item._id);
  dispatch({ type: SET_CONSTRUCTOR_BUN, itemId: item._id });
}

export function inserItem(to, item, dispatch) {
  dispatch({ type: INSERT_CONSTRUCTOR_ITEM, to, item });
}

export function moveItem(from, to, dispatch) {
  dispatch({ type: MOVE_CONSTRUCTOR_ITEM, from, to });
}

export function removeItem(from, dispatch) {
  dispatch({ type: REMOVE_CONSTRUCTOR_ITEM, from });
}
