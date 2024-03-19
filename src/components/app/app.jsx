import { useCallback, useState, useEffect, memo, useReducer } from "react";
import { makeRandomBurgerSet } from "../../services/ingredientsContext";
import { IngredientsContext, SelectedIngredientsContext } from "../../services/ingredientsContext";
import logo from "../../logo.svg";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import style from "./app.module.css";

const INGRIDIENTS_URL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [dataUrl, setDataUrl] = useState(null);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState({
    bun: [],
    main: [],
    sauce: [],
  });
  const [ingridients, setIngridients] = useState([]);

  async function loadIngridients() {
    if (!dataUrl) {
      return;
    }

    const response = await fetch(dataUrl)
      .then(async (result) => {
        if (!result.ok) {
          const resultText = await result.text();
          throw new Error(
            `http status ${result.status} ${result.statusText} ${resultText}`
          );
        }

        const resultJson = await result.json();
        const categories = resultJson.data.reduce(
          (memo, item, index) => {
            memo[item.type] = [...memo[item.type], item];
            return memo;
          },
          { bun: [], main: [], sauce: [] }
        );
        setIngridients(resultJson.data);
        setCategories(categories);
      })
      .catch((error) => {
        setError(error);
      });
  }

  useEffect(() => {
    setDataUrl(INGRIDIENTS_URL);
    loadIngridients();
  }, [dataUrl]);

  const closeErrorModalHandler = useCallback(
    (e) => {
      setError(null);
      loadIngridients();
    },
    [dataUrl]
  );

  const [constructorState, constructorDispatcher] = useReducer((state, action) => {
    if (action.type == "random") {
      const burgerSet = makeRandomBurgerSet(categories);

      const items = burgerSet.reduce((memo, ingredientId) => {
        const ingredient = ingridients.find(_ingredient => _ingredient['_id'] == ingredientId);
        memo.push(ingredient);
        return memo;
      }, []);

      const cast = items.reduce((memo, item) => {
        if (item.type == 'bum') {
          // по заданию булки не идут комплектом
          return memo + item.price * 2;
        }
        return memo + item.price;
      }, 0);

      return {
        ingredients: items,
        burgerSet: burgerSet,
        cast,
      }
    }

    return {
      ingredients: [],
      burgerSet: [],
      cast: 0,
    };
  }, {
    ingredients: [],
    burgerSet: [],
    cast: 0,
  });

  useEffect(() => {
    console.log(ingridients);
    if (ingridients && !constructorState.ingredients.length) {
      constructorDispatcher({ type: "random" });
    }
  }, [ingridients]);

  if (!error && ingridients && ingridients.length == 0) {
    return <img src={logo} className={style["App-logo"]} alt="logo" />;
  }

  return (
    <>
      <div className="app-wrapper">
        <AppHeader />
        <main>
          <IngredientsContext.Provider value={{ categories }} >
            <section className="section-wrapper pb-10">
              <BurgerIngredients />
            </section>
            <SelectedIngredientsContext.Provider value={{ constructorState, constructorDispatcher }} >
              <section className="section-wrapper ml-10">
                <BurgerConstructor />
              </section>
            </SelectedIngredientsContext.Provider>
          </IngredientsContext.Provider>
        </main>
      </div>
      {error && (
        <Modal title="Ошибка получения данных" closeHandler={closeErrorModalHandler}>
          <p className="text text_type_main-medium m-3">{dataUrl}</p>
          <p className="text text_type_main-medium">
            {error.name}: {error.message}
          </p>
        </Modal>
      )}
    </>
  );
}

export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
