import { combineReducers } from "redux";
import { burgerConstructor } from "./constructor";
import { order } from "./orders";
import { ingredients } from "./ingredients";
import { burgerAuth } from "./auth";


// Корневой редьюсер
export const rootReducer = combineReducers({
    ingredients, burgerConstructor, order, burgerAuth,
}); 