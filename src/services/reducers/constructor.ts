import { IMenuItem } from "../../utils/data.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IConstructorState } from "./constructor.types";


export enum ConstructorActions {
    RESET_CONSTRUCTOR_STATE = 'RESET_CONSTRUCTOR_STATE',          // +
    MOVE_CONSTRUCTOR_ITEM = 'MOVE_CONSTRUCTOR_ITEM',              // +
    ADD_CONSTRUCTOR_ITEM = 'ADD_CONSTRUCTOR_ITEM',                // +
    INSERT_CONSTRUCTOR_ITEM = 'INSERT_CONSTRUCTOR_ITEM',          // +
    SET_CONSTRUCTOR_BUN = 'SET_CONSTRUCTOR_BUN',                  // +
    REMOVE_CONSTRUCTOR_ITEM = 'REMOVE_CONSTRUCTOR_ITEM',          // +
}

export const initialState: IConstructorState = {
    burgerSet: [],
    bun: null,
};

export const constructorSlice = createSlice({
    name: 'constructor',
    initialState,
    reducers: {
        [ConstructorActions.RESET_CONSTRUCTOR_STATE]: (state) => {
            state.burgerSet = [];
            state.bun = null;
            // console.log('ConstructorActions.SET_CONSTRUCTOR_BUN: ', action);
            //state.bun = action.payload.bunItemId;
        },
        [ConstructorActions.SET_CONSTRUCTOR_BUN]: (state, action: PayloadAction<{ bunItemId: string }>) => {
            // console.log('ConstructorActions.SET_CONSTRUCTOR_BUN: ', action);
            state.bun = action.payload.bunItemId;
        },
        [ConstructorActions.REMOVE_CONSTRUCTOR_ITEM]: (state, action: PayloadAction<{ from: number }>) => {
            // console.log('ConstructorActions.REMOVE_CONSTRUCTOR_ITEM: ', action);
            const delBurgerSet = [...state.burgerSet];
            delBurgerSet.splice(action.payload.from, 1);
            state.burgerSet = delBurgerSet;
        },
        [ConstructorActions.INSERT_CONSTRUCTOR_ITEM]: (state, action: PayloadAction<{ menuItem: IMenuItem, to: number }>) => {
            // console.log('ConstructorActions.INSERT_CONSTRUCTOR_ITEM: ', action);
            const insertItem = { ...action.payload.menuItem };
            const insBurgerSet = [...state.burgerSet];
            insBurgerSet.splice(action.payload.to, 0, insertItem);
            state.burgerSet = insBurgerSet;
        },
        [ConstructorActions.MOVE_CONSTRUCTOR_ITEM]: (state, action: PayloadAction<{ to: number, from: number }>) => {
            // console.log('ConstructorActions.MOVE_CONSTRUCTOR_ITEM: ', action);
            const burgerSet = [...state.burgerSet];
            burgerSet[action.payload.to] = state.burgerSet[action.payload.from];
            burgerSet[action.payload.from] = state.burgerSet[action.payload.to];
            state.burgerSet = burgerSet;
        },
    },
    extraReducers(builder) {

    }
});

export const constructorActions = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
