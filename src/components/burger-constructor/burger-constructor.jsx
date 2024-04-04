import { IngredientsList } from "./burger-constructor-list/burger-constructor-list";
import { CheckoutPanel } from "./checkout-panel/checkout-panel";

export function BurgerConstructor() {
  return (
    <>
      <IngredientsList />
      <CheckoutPanel />
    </>
  );
};
