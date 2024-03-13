import {
  Counter,
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import style from "./burger-constructor.module.css";

let BurgerConstructor = ({ categories }) => {
  const categoriesKeys = Object.keys(categories);

  return (
    <section className="section-wrapper pb-10">
      <p className="text text_type_main-large mt-10">Соберите бургер</p>
      <Tabs className="mt-5" />
      <div className="scroll-box mt-10">
        {categoriesKeys.map((key) => {
          return <Category key={key} title={key} items={categories[key]} />;
        })}
      </div>
    </section>
  );
};

const Tabs = () => {
  const [current, setCurrent] = React.useState("one");
  return (
    <div style={{ display: "flex" }}>
      <Tab value="one" active={current === "one"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === "two"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === "three"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
};

const Category = ({ title, items }) => {
  return (
    <div className="pb-2">
      <p className="text text_type_main-medium">{title}</p>
      <ul className={`p-0 m-0 pt-3 ${style["constructor-list"]}`}>
        {items.map((item) => {
          return (
            <li className={`m-3 ml-2 mb-8 ${style["constructor-list-item"]}`}>
              <div className={style["constructor-list-item-image"]}>
                <img src={item.image} alt={item.name} />
              </div>
              <p
                className={`text text_type_digits-default m-1 ${style["item-price"]}`}
              >
                {item.price} &nbsp; <CurrencyIcon type="primary" />
              </p>
              <p className="text text_type_main-default">{item.name}</p>
              <Counter count={item.fat} size="default" extraClass="m-1" />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BurgerConstructor;
