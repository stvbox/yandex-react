import { menuItem } from "../../../utils/data.type";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./ingridient-details.module.css";

export const IngredientDetails = ({ ingridient }) => {
  const params = useParams();

  const { items } = useSelector(store => ({
    items: store.ingredients.items
  }));

  const _ingridient = ingridient || items.find(item => item._id == params.id);

  if (ingridient) {
    return (<IngredientDetailsInner ingridient={_ingridient} />);
  }

  return (<section className={style['section-wrapper']} >
    <div className={style['details-wrapper']} >
      <p className="text text_type_main-large">
        Детали ингредиента
      </p>
      <IngredientDetailsInner ingridient={_ingridient} />
    </div>
  </section>);
}

export function IngredientDetailsInner({ ingridient }) {
  return (<>
    <img
      src={ingridient.image}
      className={style.image}
      alt={ingridient.name}
    />
    <p className="text text_type_main-medium mt-4">{ingridient.name}</p>
    <div className={`${style.reciept} text_color_inactive mt-8 mb-5`}>
      <div className={style.part}>
        <p className="text text_type_main-default">Калории,ккал</p>
        <p className="text text_type_digits-default">{ingridient.calories}</p>
      </div>
      <div className={`${style.part} ml-5`}>
        <p className="text text_type_main-default">Белки, г</p>
        <p className="text text_type_digits-default">{ingridient.proteins}</p>
      </div>
      <div className={`${style.part} ml-5`}>
        <p className="text text_type_main-default">Жиры, г</p>
        <p className="text text_type_digits-default">{ingridient.fat}</p>
      </div>
      <div className={`${style.part} ml-5`}>
        <p className="text text_type_main-default">Углеводы, г</p>
        <p className="text text_type_digits-default">
          {ingridient.carbohydrates}
        </p>
      </div>
    </div>
  </>);
}

IngredientDetails.propTypes = {
  ingridient: menuItem.isRequired,
};

