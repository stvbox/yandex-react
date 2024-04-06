import { createRef } from "react";
import { BurgerIngredientsCategory } from "./burger-ingredients-catogory/burger-ingredients-catogory";
import { Tabs } from "./tabs/tabs";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../modal/modal";
import { useCallback, useState } from "react";
import { SET_CURRENT_INGRIDIENT } from "../../services/actions/ingridients";
import { IngredientDetails } from "./ingridient-details/ingridient-details";
import { useMemo } from "react";

export const INGRIDIENTS_TYPES = {
  bun: { title: "Булки" },
  main: { title: "Начинки" },
  sauce: { title: "Соусы" },
};

export function BurgerIngredients() {
  const dispatch = useDispatch();
  const [currentCategory, setCurrentCategory] = useState('bun');

  const scrollRef = useMemo(() => {
    return createRef();
  }, []);

  const { categories, currentItem } = useSelector(store => ({
    categories: store.ingredients.categories,
    currentItem: store.ingredients.currentItem
  }));

  const categoriesKeys = Object.keys(categories);

  const headers = Object.keys(INGRIDIENTS_TYPES).reduce((memo, key) => {
    memo[key] = { ...INGRIDIENTS_TYPES[key], ref: createRef() };
    return memo;
  }, {});

  const closeHandler = useCallback((e) => {
    dispatch({ type: SET_CURRENT_INGRIDIENT, payload: null });
    //setCurrentItem(null);
  }, []);

  const scrollHandler = (event) => {
    let nearest = { lap: 99999 };
    const scrollPosition = scrollRef.current.scrollTop + scrollRef.current.offsetTop;
    Object.keys(headers).forEach(key => {
      const headerOffsetTop = headers[key].ref.current.offsetTop;
      const lap = Math.abs(headerOffsetTop - scrollPosition);
      //console.log(key + ': ' + lap);
      if (lap <= nearest.lap) {
        nearest.type = key;
        nearest.lap = lap;
      }
    });
    setCurrentCategory(nearest.type);
  };

  //console.log('currentCategory: ', currentCategory);

  return (<>
    <p className="text text_type_main-large mt-10">Соберите бургер</p>
    <Tabs current={currentCategory} setCurrent={setCurrentCategory} className="mt-5" />
    <div ref={scrollRef} className="scroll-box mt-10" onScroll={scrollHandler} >
      {categoriesKeys.map((key) => {
        return (
          <div ref={headers[key].ref} className="pb-2" key={key}>
            <BurgerIngredientsCategory
              key={key + '_'}
              title={headers[key].title}
              items={categories[key]}
            />
          </div>
        );
      })}
    </div>
    {currentItem && (
      <Modal title="Детали ингредиента" closeHandler={closeHandler}>
        <IngredientDetails
          ingridient={currentItem}
          closeHandler={closeHandler}
        />
      </Modal>
    )}
  </>);
};
