import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { menuItemsList } from "../../../utils/data.type";
import style from "./ingridients-list.module.css";
import img from "../../../images/2b74a5d04d0501fff19659a2b4845549.png";

const IngredientsList = ({ items }) => {
  return (
    <div className={`${style.wrapper} pt-25`}>
      <div className={`${style.item} pr-5 pb-0`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={img}
        />
      </div>
      <ul className={`scroll-box ${style.list} mt-0 mb-0`}>
        {items.map((item) => {
          return (
            <li key={item.id} className={`${style.item} pr-3 pb-4`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          );
        })}
      </ul>
      <div className={`${style.item} pr-5 pb-4`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={img}
        />
      </div>
    </div>
  );
};

IngredientsList.propTypes = {
  items: menuItemsList,
};

export default IngredientsList;
