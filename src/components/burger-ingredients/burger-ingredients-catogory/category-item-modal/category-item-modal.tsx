import { useState, useCallback, useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../modal/modal";
import { IngredientDetails } from "../../ingridient-details/ingridient-details";
import { RootState, useAppSelector } from "../../../..";
import { IMenuItem } from "../../../../utils/data.type";


interface ICompParams {
    ingredientId: string;
}

export const BurgerIngredientsCategoryItemModal: FC<ICompParams> = ({ ingredientId }) => {
    const navigate = useNavigate();

    const [currentItem, setCurrentItem] = useState<IMenuItem | null>(null);
    const { ingredients } = useAppSelector((store: RootState) => ({
        ingredients: store.ingredients.items,
    }));

    useEffect(() => { // Подписка на изменения location
        const ingredient = ingredients.find(item => item._id == ingredientId) || null;
        setCurrentItem(ingredient);
    }, [ingredientId]);

    const closeHandler = useCallback(() => {
        navigate(-1);
    }, []);

    return (
        <Modal title="Детали ингредиента" closeHandler={closeHandler}>
            <IngredientDetails
                ingridient={currentItem}
                // closeHandler={closeHandler}
                isModal={true}
            />
        </Modal>
    );
}