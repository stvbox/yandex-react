import PropTypes from "prop-types";

interface IMenuItem {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

interface ICategories {
  [index: string]: IMenuItem[];
}

const menuItem = PropTypes.exact({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
});

const menuItemsList = PropTypes.arrayOf(menuItem);

const menuItemsCategories = PropTypes.exact({
  bun: menuItemsList,
  main: menuItemsList,
  sauce: menuItemsList,
});

export { menuItem, menuItemsList, menuItemsCategories };
