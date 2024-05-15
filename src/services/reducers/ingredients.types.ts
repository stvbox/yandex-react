import { ICategories, IMenuItem } from "../../utils/data.type";


export enum IngridientsActions {
    SET_INGRIDIENTS_ITEMS = 'SET_INGRIDIENTS_ITEMS',
    SET_INGRIDIENTS_CATEGORIES = 'SET_INGRIDIENTS_CATEGORIES',
    SET_INGRIDIENTS_LOADING = 'SET_INGRIDIENTS_LOADING',
    SET_INGRIDIENTS_ERROR = 'SET_INGRIDIENTS_ERROR',
}

export interface IGetIngridientsResult {
    message: string;
    data: Array<IMenuItem>;
    success: string;
    json: any;
}

export interface IngredientsState {
    isLoading: boolean;
    items: IMenuItem[];
    categories: ICategories;
    error: string | null;
}