import PropTypes from "prop-types";

export interface RequestError {
  message: string;
}

export interface IMenuItem {
  _id: string;
  name: string;
  type: IngridientsTypes;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uniqueId?: string;
}

export enum IngridientsTypes {
  bun = 'bun',
  main = 'main',
  sauce = 'sauce',
}

export type ICategories = {
  [key in IngridientsTypes as string]: IMenuItem[];
}

// const menuItem = PropTypes.exact({
//   _id: PropTypes.string,
//   name: PropTypes.string,
//   type: PropTypes.string,
//   proteins: PropTypes.number,
//   fat: PropTypes.number,
//   carbohydrates: PropTypes.number,
//   calories: PropTypes.number,
//   price: PropTypes.number,
//   image: PropTypes.string,
//   image_mobile: PropTypes.string,
//   image_large: PropTypes.string,
//   __v: PropTypes.number,
//   uniqueId: PropTypes.string, // уникальный код для списков
// });

// export const menuItemsList = PropTypes.arrayOf(menuItem);

// const menuItemsCategories = PropTypes.exact({
//   bun: menuItemsList,
//   main: menuItemsList,
//   sauce: menuItemsList,
// });

//export { menuItem, menuItemsList, menuItemsCategories };
