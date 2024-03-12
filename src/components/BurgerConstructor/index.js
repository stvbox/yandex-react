import {
  Counter,
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import img1 from "../../images/bfdc4078671aa80fd62e384c5d707e3a.png";
import img2 from "../../images/0e4ea739d31bef8c9d5bfd763f046e20.png";
import "./style.css";

let BurgerConstructor = () => {
  return (
    <section className="section-wrapper pb-10">
      <p className="text text_type_main-large mt-10">Соберите бургер</p>
      <Tabs className="mt-5" />
      <div className="scroll-box mt-10">
        <Category />
        <Category />
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

const Category = () => {
  return (
    <div className="pb-2">
      <p className="text text_type_main-medium">Бьюльки</p>
      <ul className="constructor-list p-0 m-0 pt-3">
        <li className="constructor-list-item m-3 ml-2 mb-8">
          <div className="constructor-list-item-image mr-4 ml-4">
            <img src={img1} alt="Изрьрадение" />
          </div>
          <p className="text text_type_digits-default item-price m-1">
            2 &nbsp; <CurrencyIcon type="primary" />
          </p>
          <p className="text text_type_main-default">
            Краторная булка N-200i
            <br />
            aaaa
          </p>
          <Counter count={1} size="default" extraClass="m-1" />
        </li>
        <li className="constructor-list-item m-3 ml-s mb-8">
          <div className="constructor-list-item-image">
            <img src={img2} alt="Изрьрадение" />
          </div>
          <p className="text text_type_digits-default item-price m-1">
            2 &nbsp; <CurrencyIcon type="primary" />
          </p>
          <p className="text text_type_main-default">Краторная булка N-200i</p>
          <Counter count={2} size="default" extraClass="m-1" />
        </li>
        <li className="constructor-list-item m-3 ml-2 mb-8">
          <div className="constructor-list-item-image">
            <img src={img1} alt="Изрьрадение" />
          </div>
          <p className="text text_type_digits-default item-price m-1">
            2 &nbsp; <CurrencyIcon type="primary" />
          </p>
          <p className="text text_type_main-default">
            Краторная булка N-200i
            <br />
            aaaa
          </p>
          <Counter count={3} size="default" extraClass="m-1" />
        </li>
      </ul>
    </div>
  );
};

export default BurgerConstructor;
