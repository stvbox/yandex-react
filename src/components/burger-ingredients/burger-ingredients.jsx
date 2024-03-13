import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredients.module.css";
import img from "../../images/2b74a5d04d0501fff19659a2b4845549.png";

let BurgerIngredients = ({ categories }) => {
  const items = [...categories["sauce"], ...categories["main"]];

  return (
    <section className="section-wrapper ml-10">
      <Ingredients items={items} />
      <div className={`${style["ingridients-footer"]} mt-10 mb-10 pr-4`}>
        <p
          className={`text text_type_digits-medium ${style["summary-price"]} mr-10`}
        >
          610 &nbsp; <CurrencyIcon type="primary" />
        </p>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
      {/* -- BurgerIngredients */}
    </section>
  );
};

const Ingredients = ({ items }) => {
  return (
    <div className={`${style["ingredients-list-full"]} pt-25`}>
      <div className={`${style["ingredients-list-item"]} pr-5 pb-0`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={img}
        />
      </div>
      <ul className={`scroll-box ${style["ingredients-list"]} mt-0 mb-0`}>
        {items.map((item) => {
          return (
            <li
              key={item.id}
              className={`${style["ingredients-list-item"]} pr-3 pb-4`}
            >
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
      <div className={`${style["ingredients-list-item"]} pr-5 pb-4`}>
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

export default BurgerIngredients;
