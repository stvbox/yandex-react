import { useCallback, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { loadIngridients } from "../../services/actions/ingridients";
import { AppHeader } from "../app-header/app-header";
import { ConstructorPage, LoginPage, RegisterPage, ForgotPage, ResetPage, ProfilePage, NotFound404 } from "../../pages";
import { IngredientDetails } from "../burger-ingredients/ingridient-details/ingridient-details";
import { useDispatch, useSelector } from 'react-redux';
import { SET_INGRIDIENTS_ERROR } from "../../services/actions/ingridients";
import { getUserInfo } from "../../services/actions/auth";
import { OrdersPage } from "../../pages/orders-page";
import { ProfileForm } from "../profile-form/profile-form";
import { ProtectedRouteElement } from "../protected-route/protected-route";
import { BurgerIngredientsCategoryItemModal } from "../burger-ingredients/burger-ingredients-catogory/category-item-modal/category-item-modal";
import logo from "../../logo.svg";
import style from "./app.module.css";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;
  const ingridientId = location.state?.ingridientId;

  const { waitUserInfo, ingridients, error } = useSelector(store => ({
    ingridients: store.ingredients.items,
    error: store.ingredients.error,
    waitUserInfo: store.burgerAuth.wait,
  }));

  useEffect(() => {
    dispatch(loadIngridients()); // React StrictMode renders components twice on dev server
    dispatch(getUserInfo());
  }, []);

  const closeErrorModalHandler = useCallback((e) => {
    dispatch({ type: SET_INGRIDIENTS_ERROR, error: null });
    dispatch(loadIngridients()); // Повсторная згрузка произойдет, если была ошибка загрузки
  }, []);

  if (waitUserInfo || !error && ingridients && ingridients.length == 0) {
    return <img src={logo} className={style["App-logo"]} alt="logo" />;
  }

  return (<>
    <div className="app-wrapper">
      <AppHeader />
      {/* {JSON.stringify(window.history.state)} */}
      <Routes location={background || location} >
        {/* / - главная страница, конструктор бургеров. */}
        <Route path="/" element={<ConstructorPage />} />

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

        {/* /ingredients/:id — страница ингредиента. (ЧИТ по рекомендации наставника!) */}
        <Route path="/ingredients/:id" element={<IngredientDetails />} />

        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {/* Show the modal when a `backgroundLocation` is set */}
      {background && ( // Итолько сейчас я понял, что это просто дополниетельная точка реакции на маршрут...
        <Routes>
          <Route path="/ingredients/:id" element={<BurgerIngredientsCategoryItemModal ingridientId={ingridientId} />} />
        </Routes>
      )}
    </div>
  </>);
}

function HackRouter() {
  const location = useLocation();
}

export { App };
//export { AppWithStore as App };
