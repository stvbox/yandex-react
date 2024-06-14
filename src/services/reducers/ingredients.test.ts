import { IMenuItem, IngridientsTypes } from "../../utils/data.type";
import { ingredientsReducer, initialState, loadIngridients } from "./ingredients";
import { IngredientsState } from "./ingredients.types";


// export const initialState: IngredientsState = {
//     isLoading: false,
//     items: [],
//     categories: { bun: [], main: [], sauce: [] },
//     error: null,
// };

const STUB_ITEM_BUN: IMenuItem = {
    _id: "1",
    name: "",
    type: IngridientsTypes.bun,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "",
    image_mobile: "",
    image_large: "",
    __v: 0
};

const STUB_ITEM_SAUCE: IMenuItem = {
    ...STUB_ITEM_BUN, type: IngridientsTypes.sauce,
};

const STUB_ITEM_MAIN: IMenuItem = {
    ...STUB_ITEM_BUN, type: IngridientsTypes.main,
};

describe("ingredientsSlice", () => {
    it("Загрузка ингридиентов меняет состояние", () => {
        let action = { type: loadIngridients.pending.type };
        let state = ingredientsReducer(initialState, action);
        expect(state.isLoading).toBeTruthy();

        action = { type: loadIngridients.rejected.type };
        state = ingredientsReducer(initialState, action);
        expect(state.isLoading).toBeFalsy();

        const fulFillaction = {
            type: loadIngridients.fulfilled.type,
            payload: {
                json: {
                    data: [
                        STUB_ITEM_SAUCE,
                        STUB_ITEM_MAIN,
                        STUB_ITEM_BUN,
                    ]
                }
            }
        };
        state = ingredientsReducer(initialState, fulFillaction);
        expect(state.isLoading).toBeFalsy();

        expect(state.items.length).toBe(3);
        expect(state.categories[IngridientsTypes.sauce].length).toBe(1);
        expect(state.categories[IngridientsTypes.main].length).toBe(1);
        expect(state.categories[IngridientsTypes.bun].length).toBe(1);

    });
});