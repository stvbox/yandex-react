import { createRef, useEffect } from "react";
import { BurgerIngredientsCategory } from "./burger-ingredients-catogory/burger-ingredients-catogory";
import { Tabs } from "./tabs/tabs";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../modal/modal";
import { useCallback, useState } from "react";
import { IngredientDetails } from "./ingridient-details/ingridient-details";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";

export const ingridientsHistory = createBrowserHistory();

export const INGRIDIENTS_TYPES = {
  bun: { title: "Булки" },
  main: { title: "Начинки" },
  sauce: { title: "Соусы" },
};

export function BurgerIngredients() {
  const navigate = useNavigate();

  const [currentCategory, setCurrentCategory] = useState('bun');
  const [currentItem, setCurrentItem] = useState(null);

  const scrollRef = useMemo(() => {
    return createRef();
  }, []);

  const { categories, ingredients } = useSelector(store => ({
    categories: store.ingredients.categories,
    ingredients: store.ingredients.items,
  }));

  const categoriesKeys = Object.keys(categories);

  const headers = Object.keys(INGRIDIENTS_TYPES).reduce((memo, key) => {
    memo[key] = { ...INGRIDIENTS_TYPES[key], ref: createRef() };
    return memo;
  }, {});

  const closeHandler = useCallback((e) => {
    navigate(-1);
  }, []);

  useEffect(() => { // Подписка на изменения location
    const unlisten = ingridientsHistory.listen(({ action, location }) => {
      if (action == 'PUSH' || action == 'POP') {

        if (location.pathname == '/') {
          setCurrentItem(null);
          return;
        }

        const uuid = location.pathname.replace('/ingredients/', '');
        const ingredient = ingredients.find(item => item._id == uuid);
        setCurrentItem(ingredient);

        console.log({ action, location });
      }
    });
    return () => unlisten();
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
