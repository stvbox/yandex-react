import { RefObject, createRef } from "react";
import { BurgerIngredientsCategory } from "./burger-ingredients-catogory/burger-ingredients-catogory";
import { Tabs } from "./tabs/tabs";
import { useState } from "react";
import { useMemo } from "react";
import { IngridientsTypes } from "../../utils/data.type";
import { RootState, useAppSelector } from "../..";


// import { createBrowserHistory } from "history";
// export const ingridientsHistory = createBrowserHistory();

type HedersType = {
  [key in IngridientsTypes as string]: {
    title: string;
    ref: RefObject<HTMLDivElement>;
  };
};

export type CategodiesTitles = {
  [key in IngridientsTypes as string]: {
    title: string;
  };
}

export const INGRIDIENTS_TYPES_TITLES: CategodiesTitles = {
  bun: { title: "Булки" },
  main: { title: "Начинки" },
  sauce: { title: "Соусы" },
};

export function BurgerIngredients() {
  const [currentCategory, setCurrentCategory] = useState('bun');

  const scrollRef: RefObject<any> = useMemo(() => {
    return createRef();
  }, []);

  const { categories } = useAppSelector((store: RootState) => ({
    categories: store.ingredients.categories,
  }));

  const categoriesKeys = Object.keys(categories);

  const headers = Object.keys(IngridientsTypes).reduce((memo, key) => {
    memo[key] = { ...INGRIDIENTS_TYPES_TITLES[key], ref: createRef() };
    return memo;
  }, {} as HedersType);

  const scrollHandler = () => {
    let nearest = { lap: 99999, type: '' };
    const scrollPosition = scrollRef.current.scrollTop + scrollRef.current.offsetTop;
    Object.keys(headers).forEach(key => {
      const headerRef = headers[key];

      const headerOffsetTop = headerRef?.ref?.current?.offsetTop || 0;
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
  </>);
};
