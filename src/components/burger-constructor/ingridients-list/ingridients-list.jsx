import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { menuItemsList } from "../../../utils/data.type";
import style from "./ingridients-list.module.css";

const TopBottomWords = {
  bottom: 'низ',
  top: 'верх',
};

function IngredientsList({ items }) {

  const bunItem = items.find(_ingredient => _ingredient.type == 'bun');

  console.log('IngredientsList: ', items);

  return (
    <>
      <div className={`${style.wrapper} pt-25`}>
        <div className={`${style.item} pr-5 pb-0`}>
          <BunComponent bunItem={bunItem} type="top" />
        </div>
        <ul className={`scroll-box ${style.list} mt-0 mb-0`}>
          {items.filter(item => item.type != 'bun').map((item, index) => {
            return (
              <li className={`${style.item} pr-3 pb-4`} key={`${item._id}-${index}`}>
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
          <BunComponent bunItem={bunItem} type="bottom" />
        </div>
      </div>
    </>
  );
};

function BunComponent({ type, bunItem }) {
  return (bunItem && <ConstructorElement
    type={type}
    isLocked={true}
    text={`${bunItem.name}(${TopBottomWords[type]})`}
    price={bunItem.price}
    thumbnail={bunItem.image}
  />);
}

IngredientsList.propTypes = {
  items: menuItemsList,
};

export default IngredientsList;
