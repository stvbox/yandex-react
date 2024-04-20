import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";

export function ConstructorPage() {
    return (
        <main>
            <section className="section-wrapper pb-10">
                <BurgerIngredients />
            </section>
            <section className="section-wrapper ml-10">
                <BurgerConstructor />
            </section>
        </main>
    );
}