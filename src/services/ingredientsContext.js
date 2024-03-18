import { createContext } from "react";

export const IngredientsContext = createContext([]);
export const SelectedIngredientsContext = createContext([]);


/* bun, main, sauce */
export const makeRandomBurgerSet = (ingredientsCategories) => {
    const result = [];
    const bunIndex = Math.floor(Math.random() * ingredientsCategories['bun'].length);
    result.push(ingredientsCategories['bun'][bunIndex]._id);

    ['main', 'sauce'].forEach(categoryKey => {
        for (let i = 0; i < Math.floor(Math.random() * 10) + 1; i++) {
            const index = Math.floor(Math.random() * ingredientsCategories[categoryKey].length);
            result.push(ingredientsCategories[categoryKey][index]._id);
        }
    });

    return result;
}