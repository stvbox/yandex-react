import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorCategory from "./burder-constructor-catogory/burder-constructor-catogory";
import { menuItemsCategories } from "../../utils/data.type";

const BurgerConstructor = ({ categories }) => {
  const categoriesKeys = Object.keys(categories);

  return (
    <section className="section-wrapper pb-10">
      <p className="text text_type_main-large mt-10">Соберите бургер</p>
      <Tabs className="mt-5" />
      <div className="scroll-box mt-10">
        {categoriesKeys.map((key) => {
          return (
            <BurgerConstructorCategory
              key={key}
              title={key}
              items={categories[key]}
            />
          );
        })}
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  categories: menuItemsCategories,
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

export default BurgerConstructor;
