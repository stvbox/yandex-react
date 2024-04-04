import {
    SET_CONSTRUCTOR_STATE,
    MOVE_CONSTRUCTOR_ITEM,
    INSERT_CONSTRUCTOR_ITEM,
    SET_CONSTRUCTOR_BUN,
    REMOVE_CONSTRUCTOR_ITEM,
} from "../actions/constructor";
import uuid4 from "uuid4";


const constructorInitialState = {
    burgerSet: [],
    bun: null,
};

export const constructor = (state = constructorInitialState, action) => {

    switch (action.type) {
        case REMOVE_CONSTRUCTOR_ITEM:

            //console.log(REMOVE_CONSTRUCTOR_ITEM, action);

            const delBurgerSet = [...state.burgerSet];
            delBurgerSet.splice(action.from, 1);

            return {
                ...state,
                burgerSet: delBurgerSet,
            };

        case SET_CONSTRUCTOR_BUN:

            //console.log(SET_CONSTRUCTOR_BUN, action);

            return {
                ...state,
                bun: action.itemId
            };
        case INSERT_CONSTRUCTOR_ITEM:
            const uuidItem = {
                ...action.item,
                uniqueId: uuid4(), // Раз надо, значит надо но идентификатор + index думаю не хуже
            };

            const insBurgerSet = [...state.burgerSet];
            insBurgerSet.splice(action.to, 0, uuidItem);

            return {
                ...state,
                burgerSet: insBurgerSet,
            };

        case MOVE_CONSTRUCTOR_ITEM:

            //console.log(`MOVE_CONSTRUCTOR_ITEM: action.from: ${action.from} action.to: ${action.to}`);

            const burgerSet = [...state.burgerSet];
            burgerSet[action.to] = state.burgerSet[action.from];
            burgerSet[action.from] = state.burgerSet[action.to];

            return {
                ...state,
                burgerSet,
            };

        case SET_CONSTRUCTOR_STATE:

            //console.log(SET_CONSTRUCTOR_STATE, action);

            return {
                ...state,
                bun: action.bun,
                burgerSet: action.burgerSet,
            };
    }

    return state;
}