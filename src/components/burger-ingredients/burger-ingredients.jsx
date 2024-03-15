import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { menuItemsCategories } from "../../utils/data.type";
import IngredientsList from "./ingridients-list/ingridients-list";
import style from "./burger-ingredients.module.css";

const BurgerIngredients = ({ categories }) => {
  const items = [...categories["sauce"], ...categories["main"]];

  return (
    <section className="section-wrapper ml-10">
      <IngredientsList items={items} />
      <div className={`${style.footer} mt-10 mb-10 pr-4`}>
        <p className={`text text_type_digits-medium ${style.price} mr-10`}>
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

BurgerIngredients.propTypes = {
  categories: menuItemsCategories,
};

export default BurgerIngredients;
