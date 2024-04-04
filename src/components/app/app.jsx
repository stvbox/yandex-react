import { useCallback, useEffect } from "react";
import { loadIngridients } from "../../services/actions/ingridients";
import logo from "../../logo.svg";
import { AppHeader } from "../app-header/app-header";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { Modal } from "../modal/modal";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from "../../services/reducers";
import { thunk } from "redux-thunk";
import { applyMiddleware } from "redux";
import { useSelector } from "react-redux";
import { SET_INGRIDIENTS_ERROR } from "../../services/actions/ingridients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { compose } from "redux";
import style from "./app.module.css";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ),
);

function AppWithStore() {
  return (<DndProvider backend={HTML5Backend}>
    <Provider store={store}><App /></Provider>
  </DndProvider>);
}

function App() {

  const { ingridients, categories, error } = useSelector(store => ({
    ingridients: store.ingredients.items,
    categories: store.ingredients.categories,
    isLoading: store.ingredients.isLoading,
    error: store.ingredients.error,
    constructorState: store.constructor,
  }));

  useEffect(() => {
    store.dispatch(loadIngridients());
  }, []);

  const closeErrorModalHandler = useCallback((e) => {
    store.dispatch({ type: SET_INGRIDIENTS_ERROR, error: null });
    store.dispatch(loadIngridients());
  }, []);

  // useEffect(() => {
  //   if (ingridients && categories) {
  //     store.dispatch(makeRandomBurger(categories, ingridients));
  //   }
  // }, [categories, ingridients]);

  if (!error && ingridients && ingridients.length == 0) {
    return <img src={logo} className={style["App-logo"]} alt="logo" />;
  }

  return (
    <>
      <Provider store={store}>
        <div className="app-wrapper">
          <AppHeader />
          <main>
            <section className="section-wrapper pb-10">
              <BurgerIngredients />
            </section>
            <section className="section-wrapper ml-10">
              <BurgerConstructor />
            </section>
          </main>
        </div>
      </Provider>
      {error && (
        <Modal title="Ошибка получения данных" closeHandler={closeErrorModalHandler}>
          <p className="text text_type_main-medium">
            {error.toString()}
          </p>
        </Modal>
      )}
    </>
  );
}

export { AppWithStore as App };

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
