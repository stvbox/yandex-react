import { React, useCallback, useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import style from "./app.module.css";

const INGRIDIENTS_URL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [state, setState] = useState({
    categories: { bun: [], main: [], sauce: [] },
    ingridients: [],
    error: null,
  });

  const loadIngridients = () => {
    console.log(" --- ");
    //this.setState({ ...this.state, hasError: false, isLoading: true });
    fetch(INGRIDIENTS_URL)
      .then((result) => {
        //console.log("then1: ", result);
        return result.json();
      })
      .then((result) => {
        const categories = result.data.reduce(
          (memo, item, index) => {
            memo[item.type] = [...memo[item.type], item];
            return memo;
          },
          { bun: [], main: [], sauce: [] }
        );
        setState({ ...state, categories, ingridients: result.data });
      })
      .catch((error) => {
        setState({ ...state, error });
      });
  };

  useEffect(() => {
    loadIngridients();
  }, []);

  const closeModalHandler = useCallback((e) => {
    setState({ ...state, error: null });
    loadIngridients();
  }, []);

  return (
    <>
      <div className="app-wrapper">
        <AppHeader />
        <main>
          <section className="section-wrapper pb-10">
            <BurgerConstructor categories={state.categories} />
          </section>
          <section className="section-wrapper ml-10">
            <BurgerIngredients categories={state.categories} />
          </section>
        </main>
      </div>
      {state.error && (
        <Modal title="Ошибка получения данных" closeHandler={closeModalHandler}>
          <p className="text text_type_main-medium m-3">{INGRIDIENTS_URL}</p>
          <p className="text text_type_main-medium">
            {state.error.name}: {state.error.message}
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
