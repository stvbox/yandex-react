import { IMenuItem, IngridientsTypes } from "../../utils/data.type";
import { ConstructorActions, constructorActions, constructorReducer, initialState } from "./constructor";
import { IConstructorState } from "./constructor.types";


// const initialState: IConstructorState = {
//     burgerSet: [],
//     bun: null,
// };

const STUB_ITEM: IMenuItem = {
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

describe("constructorSlice", () => {

    it('Добавление булки', () => {
        const stubItemX: IMenuItem = { ...STUB_ITEM, _id: "2" };
        const mockState = {
            ...initialState,
            burgerSet: [STUB_ITEM, stubItemX],
            bun: "fakeBun",
        };

        const action = constructorActions[ConstructorActions.MOVE_CONSTRUCTOR_ITEM]({
            to: 0, from: 1
        });
        const state = constructorReducer(mockState, action);

        expect(state.burgerSet[0]._id).toBe('2');
    });

    it('Удаление булки', () => {
        const mockState = {
            ...initialState,
            burgerSet: [STUB_ITEM],
            bun: "fakeBun",
        };

        const action = constructorActions[ConstructorActions.REMOVE_CONSTRUCTOR_ITEM]({ from: 0 });
        const state = constructorReducer(mockState, action);

        expect(state.burgerSet.length).toBe(0);
    });

    it('Выбор булки', () => {
        const mockState = {
            ...initialState,
            burgerSet: [STUB_ITEM],
            bun: "fakeBun",
        };

        const action = constructorActions[ConstructorActions.SET_CONSTRUCTOR_BUN]({ bunItemId: 'bun' });
        const state = constructorReducer(mockState, action);

        expect(state.bun).toBe('bun');
    });

    it('Сброс ошибки авторизации', () => {
        const mockState = {
            ...initialState,
            burgerSet: [STUB_ITEM],
            bun: "fakeBun",
        };

        const action = constructorActions[ConstructorActions.RESET_CONSTRUCTOR_STATE]();
        const state = constructorReducer(mockState, action);

        expect(state.bun).toBeNull();
        expect(state.burgerSet.length).toBe(0);
    });
});