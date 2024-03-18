import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { menuItemsList } from "../../../utils/data.type";
import style from "./ingridients-list.module.css";
import img from "../../../images/bfdc4078671aa80fd62e384c5d707e3a.png";

const IngredientsList = ({ items }) => {

  const bunItem = items.find(_ingredient => _ingredient.type == 'bun');

  function BunComponent({ type, bunItem }) {
    return (<ConstructorElement
      type={type}
      isLocked={true}
      text={bunItem.name}
      price={bunItem.price}
      thumbnail={bunItem.image}
    />);
  }

  return (
    <>{items.lenght && <div className={`${style.wrapper} pt-25`}>
      <div className={`${style.item} pr-5 pb-0`}>
        <BunComponent bunItem={bunItem} type="top" />
      </div>
      <ul className={`scroll-box ${style.list} mt-0 mb-0`}>
        {items.filter(item => item.type != 'bun').map((item) => {
          return (
            <li className={`${style.item} pr-3 pb-4`} key={item._id}>
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
    </div>}

    </>
  );
};

IngredientsList.propTypes = {
  items: menuItemsList,
};

export default IngredientsList;
