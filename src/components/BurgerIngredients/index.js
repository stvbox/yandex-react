import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import img from "../../images/2b74a5d04d0501fff19659a2b4845549.png";
import "./style.css";

let BurgerIngredients = () => {
  return (
    <section className="section-wrapper ml-10">
      <Items />
      <div className="ingridients-footer mt-10 mb-10 pr-4">
        <p className="text text_type_digits-medium summary-price mr-10">
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

const Items = () => {
  return (
    <div className="ingredients-list-full pt-25">
      <div className="ingredients-list-item pl-4 pb-0">
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={img}
        />
      </div>
      <ul className="scroll-box ingredients-list mt-0 mb-0">
        <li className="ingredients-list-item pl-4 pb-4">
          <DragIcon type="primary" />
          <ConstructorElement
            text="Плоды Фалленианского дерева"
            price={50}
            thumbnail={img}
          />
        </li>
        <li className="ingredients-list-item pl-4 pb-4">
          <DragIcon type="primary" />
          <ConstructorElement
            text="Плоды Фалленианского дерева"
            price={50}
            thumbnail={img}
          />
        </li>
        <li className="ingredients-list-item pl-4 pb-4">
          <DragIcon type="primary" />
          <ConstructorElement
            text="Плоды Фалленианского дерева"
            price={50}
            thumbnail={img}
          />
        </li>
        <li className="ingredients-list-item pl-4 pb-4">
          <DragIcon type="primary" />
          <ConstructorElement
            text="Плоды Фалленианского дерева"
            price={50}
            thumbnail={img}
          />
        </li>
        <li className="ingredients-list-item pl-4 pb-4">
          <DragIcon type="primary" />
          <ConstructorElement
            text="Плоды Фалленианского дерева"
            price={50}
            thumbnail={img}
          />
        </li>
        <li className="ingredients-list-item pl-4 pb-4">
          <DragIcon type="primary" />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={img}
          />
        </li>
        <li className="ingredients-list-item pl-4 pb-4">
          <DragIcon type="primary" />
          <ConstructorElement
            text="Плоды Фалленианского дерева"
            price={50}
            thumbnail={img}
          />
        </li>
        <li className="ingredients-list-item pl-4 pb-4">
          <DragIcon type="primary" />
          <ConstructorElement
            text="Плоды Фалленианского дерева"
            price={50}
            thumbnail={img}
          />
        </li>
        <li className="ingredients-list-item pl-4 pb-4">
          <DragIcon type="primary" />
          <ConstructorElement
            text="Плоды Фалленианского дерева"
            price={50}
            thumbnail={img}
          />
        </li>
        <li className="ingredients-list-item pl-4 pb-4">
          <DragIcon type="primary" />
          <ConstructorElement
            text="Плоды Фалленианского дерева"
            price={50}
            thumbnail={img}
          />
        </li>
      </ul>
      <div className="ingredients-list-item pl-4 pb-4">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={img}
        />
      </div>
    </div>
    // <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
    //   <ConstructorElement
    //     type="top"
    //     isLocked={true}
    //     text="Краторная булка N-200i (верх)"
    //     price={200}
    //     thumbnail={img}
    //   />
    //   <ConstructorElement
    //     type="bottom"
    //     isLocked={true}
    //     text="Краторная булка N-200i (низ)"
    //     price={200}
    //     thumbnail={img}
    //   />
    // </div>
  );
};

export default BurgerIngredients;
