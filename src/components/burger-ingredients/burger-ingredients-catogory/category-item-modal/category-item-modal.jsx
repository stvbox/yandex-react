import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../modal/modal";
import { IngredientDetails } from "../../ingridient-details/ingridient-details";


export function BurgerIngredientsCategoryItemModal({ ingredientId }) {
    const navigate = useNavigate();

    const [currentItem, setCurrentItem] = useState(null);
    const { ingredients } = useSelector(store => ({
        ingredients: store.ingredients.items,
    }));

    useEffect(() => { // Подписка на изменения location
        const ingredient = ingredients.find(item => item._id == ingredientId);
        setCurrentItem(ingredient);
    }, [ingredientId]);

    const closeHandler = useCallback((e) => {
        navigate(-1);
    }, []);

    return (
        <Modal title="Детали ингредиента" closeHandler={closeHandler}>
            <IngredientDetails
                ingridient={currentItem}
                closeHandler={closeHandler}
                isModal={true}
            />
        </Modal>
    );
}