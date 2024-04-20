import { useCallback, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { loadIngridients } from "../../services/actions/ingridients";
import logo from "../../logo.svg";
import { AppHeader } from "../app-header/app-header";
import { ConstructorPage, LoginPage, RegisterPage, ForgotPage, ResetPage, ProfilePage, NotFound404 } from "../pages";
import { IngredientDetails } from "../burger-ingredients/ingridient-details/ingridient-details";
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
import { getUserInfo } from "../../services/actions/auth";
import { Navigate } from "react-router-dom";
import { OrdersPage } from "../pages/orders-page";
import { ProfileForm } from "../profile-form/profile-form";
import style from "./app.module.css";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : args => args,
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ),
);

function AppWithStore() {
  return (<DndProvider backend={HTML5Backend}>
    <Provider store={store}>
      <App />
    </Provider>
  </DndProvider>);
}

function App() {

  const { waitUserInfo, ingridients, error, isLoading } = useSelector(store => ({
    // isLoading: store.ingredients.isLoading,
    // constructorState: store.burgerConstructor,
    ingridients: store.ingredients.items,
    error: store.ingredients.error,
    waitUserInfo: store.burgerAuth.wait,
  }));

  useEffect(() => {
    store.dispatch(loadIngridients()); // React StrictMode renders components twice on dev server
    store.dispatch(getUserInfo());
  }, []);

  const closeErrorModalHandler = useCallback((e) => {
    store.dispatch({ type: SET_INGRIDIENTS_ERROR, error: null });
    store.dispatch(loadIngridients()); // Повсторная згрузка произойдет, если была ошибка загрузки
  }, []);

  if (waitUserInfo || !error && ingridients && ingridients.length == 0) {
    return <img src={logo} className={style["App-logo"]} alt="logo" />;
  }

  return (<BrowserRouter>
    <Provider store={store}>
      <div className="app-wrapper">
        <AppHeader />
        <Routes>
          {/* / - главная страница, конструктор бургеров. */}
          <Route path="/" element={<ConstructorPage />} />
          <Route path="/ingredients/:id" element={<IngredientDetails />} />

          {/* /login - страница авторизации. */}
          <Route path="/login" element={<ProtectedRouteElement element={<LoginPage />} ifAuth='/profile' />} />
          {/* /register - страница регистрации. */}
          <Route path="/register" element={<ProtectedRouteElement element={<RegisterPage />} ifAuth='/profile' />} />
          {/* /forgot-password - страница восстановления пароля. */}
          <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPage />} ifAuth='/profile' />} />
          {/* /reset-password - страница сброса пароля. */}
          <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPage />} ifAuth='/profile' />} />
          {/* /profile — страница с настройками профиля пользователя. */}
          <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} ifNotAuth={<LoginPage />} />}>

            {/* /profile — страница списка заказов. */}
            <Route index element={<ProfileForm />} />
            {/* /profile/orders — страница списка заказов. */}
            <Route path="orders" element={<OrdersPage />} />

          </Route>

          {/* /ingredients/:id — страница ингредиента. */}
          <Route path="/ingredients/:id" element={<ConstructorPage />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </div>
    </Provider>
    {error && (
      <Modal title="Ошибка получения данных" closeHandler={closeErrorModalHandler}>
        <p className="text text_type_main-medium">
          {error.toString()}
        </p>
      </Modal>
    )}
  </BrowserRouter>);
}

export function ProtectedRouteElement({ element, ifAuth, ifNotAuth }) {

  const { email } = useSelector(store => ({
    email: store.burgerAuth.email,
  }));

  if (email) {
    if (ifAuth) {
      return (typeof ifAuth == 'string')
        ? (<Navigate to={ifAuth} />) : ifAuth;
    }
  } else {
    if (ifNotAuth) {
      return (typeof ifNotAuth == 'string')
        ? (<Navigate to={ifNotAuth} />) : ifNotAuth;
    }
  }

  return element;
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
