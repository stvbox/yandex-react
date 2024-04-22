import { BurgerConstructor } from "../components/burger-constructor/burger-constructor";
import { BurgerIngredients } from "../components/burger-ingredients/burger-ingredients";

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