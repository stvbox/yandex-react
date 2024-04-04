import uuid4 from "uuid4";

export const SET_CONSTRUCTOR_STATE = 'SET_CONSTRUCTOR_STATE';
export const MOVE_CONSTRUCTOR_ITEM = 'MOVE_CONSTRUCTOR_ITEM';
export const ADD_CONSTRUCTOR_ITEM = 'ADD_CONSTRUCTOR_ITEM';
export const INSERT_CONSTRUCTOR_ITEM = 'INSERT_CONSTRUCTOR_ITEM';
export const SET_CONSTRUCTOR_BUN = 'SET_CONSTRUCTOR_BUN';
export const REMOVE_CONSTRUCTOR_ITEM = 'REMOVE_CONSTRUCTOR_ITEM';


export const makeRandomBurger = (ingridients) => (dispatche) => {

    //console.log('- 1 -');

    const bunItemId = makeRandomBun(ingridients);

    //console.log('- 2 -');

    const burgerSet = makeRandomBurgerSet(ingridients);

    //console.log('- 3 -');

    // const burgerSet = makeRandomBurgerSet(categories);
    // const bunItemId = makeRandomBun(categories);

    const action = {
        type: SET_CONSTRUCTOR_STATE,
        bun: bunItemId,
        burgerSet: burgerSet,
    };

    // console.log('action', action);

    dispatche(action);
};

const makeRandomBun = (ingridients) => {
    const buns = ingridients.filter(item => item.type == 'bun');
    if (buns.length) {
        const bunIndex = Math.floor(Math.random() * buns.length);
        return buns[bunIndex]._id;
    }
}

/* bun, main, sauce */
const makeRandomBurgerSet = (ingridients) => {
    const result = [];

    const notBuns = ingridients.filter(item => item.type != 'bun');

    ['main', 'sauce'].forEach(categoryKey => {
        const items = notBuns.filter(item => item.type == categoryKey);
        for (let i = 0; i < Math.floor(Math.random() * 2) + 1; i++) {
            const index = Math.floor(Math.random() * items.length);
            result.push({
                ...items[index],
                uniqueId: uuid4(),
            });
        }
    });

    return result;
}
