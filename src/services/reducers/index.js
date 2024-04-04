import { combineReducers } from "redux";
import { constructor } from "./constructor";
import { order } from "./orders";
import { ingredients } from "./ingredients";

// Корневой редьюсер
export const rootReducer = combineReducers({
    ingredients, constructor, order
}); 