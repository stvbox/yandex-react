import React from "react";
import { useContext } from "react";
import { IngredientsContext } from "../../services/ingredientsContext";
import BurgerIngredientsCategory from "./burger-ingredients-catogory/burger-ingredients-catogory";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { menuItemsCategories } from "../../utils/data.type";
import style from "./burger-ingredients.module.css";

const INGRIDIENTS_TYPES = {
  bun: { title: "Булки" },
  main: { title: "Начинки" },
  sauce: { title: "Соусы" },
};

function BurgerIngredients() {
  const { categories } = useContext(IngredientsContext);
  const categoriesKeys = Object.keys(categories);

  return (
    <>
      <p className="text text_type_main-large mt-10">Соберите бургер</p>
      <Tabs className="mt-5" />
      <div className="scroll-box mt-10">
        {categoriesKeys.map((key) => {
          return (
            <div className="pb-2" key={key}>
              <BurgerIngredientsCategory
                title={INGRIDIENTS_TYPES[key].title}
                items={categories[key]}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

BurgerIngredients.propTypes = {
  categories: menuItemsCategories,
};

const Tabs = () => {
  const [current, setCurrent] = React.useState("one");
  return (
    <div className={style.tabs}>
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

export default BurgerIngredients;
