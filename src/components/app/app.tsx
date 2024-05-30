import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AppHeader } from "../app-header/app-header";
import { ConstructorPage, LoginPage, RegisterPage, ForgotPage, ResetPage, ProfilePage, NotFound404 } from "../../pages";
import { IngredientDetails } from "../burger-ingredients/ingridient-details/ingridient-details";
import { useSelector } from 'react-redux';
import { OrdersPage } from "../../pages/orders-page";
import { ProfileForm } from "../profile-form/profile-form";
import { ProtectedRoute } from "../protected-route/protected-route";
import { BurgerIngredientsCategoryItemModal } from "../burger-ingredients/burger-ingredients-catogory/category-item-modal/category-item-modal";
import { RootState, useAppDispatch } from "../..";
import { loadIngridients } from "../../services/reducers/ingredients";
import { getUserInfo } from "../../services/actions/auth";
import { FeedPage } from "../../pages/feed-page";
import { FeedDetailsPage } from "../../pages/feed-details-page";
import { OrderActions } from "../../services/reducers/orders.types";
import { OrderDetailsPage } from "../../pages/order-details-page";
import { OrderDetailsModal } from "../order-details-modal/order-details-modal";
import logo from "../../logo.svg";
import style from "./app.module.css";

function App() {
  //const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const background = location.state?.background;

  const ingridientId: string = location.state?.ingridientId;
  const orderNumber: string = location.state?.orderNumber;

  const { waitUserInfo, ingridients, error } = useSelector((store: RootState) => ({
    ingridients: store.ingredients.items,
    error: store.ingredients.error,
    waitUserInfo: store.auth.wait,
  }));

  useEffect(() => {
    dispatch(loadIngridients()); // React StrictMode renders components twice on dev server
    dispatch(getUserInfo());
  }, []);

  // const closeErrorModalHandler = useCallback((e: any) => {
  //   //store.dispatch({ type: IngridientsActions.SET_INGRIDIENTS_ERROR, error: null });
  //   dispatch(ingredientsActions[IngridientsActions.SET_INGRIDIENTS_ERROR](null));
  //   dispatch(loadIngridients()); // Повсторная згрузка произойдет, если была ошибка загрузки
  // }, []);

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
        <Route path="/login" element={<ProtectedRoute element={<LoginPage />} ifAuth='/profile' />} />
        {/* /register - страница регистрации. */}
        <Route path="/register" element={<ProtectedRoute element={<RegisterPage />} ifAuth='/profile' />} />
        {/* /forgot-password - страница восстановления пароля. */}
        <Route path="/forgot-password" element={<ProtectedRoute element={<ForgotPage />} ifAuth='/profile' />} />
        {/* /reset-password - страница сброса пароля. */}
        <Route path="/reset-password" element={<ProtectedRoute element={<ResetPage />} ifAuth='/profile' />} />
        {/* /profile — страница с настройками профиля пользователя. */}
        <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} ifNotAuth={<LoginPage />} />}>

          {/* /profile — страница списка заказов. */}
          <Route index element={<ProfileForm />} />
          {/* /profile/orders — страница списка заказов. */}
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/:orderNumber" element={<ProtectedRoute element={<OrderDetailsPage />} ifNotAuth={<LoginPage />} />} />
        </Route>

        {/* /ingredients/:id — страница ингредиента. (ЧИТ по рекомендации наставника!) */}
        <Route path="/ingredients/:id" element={<IngredientDetails />} />

        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:orderNumber" element={<FeedDetailsPage />} />

        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {/* Show the modal when a `backgroundLocation` is set */}
      {background && ( // Итолько сейчас я понял, что это просто дополниетельная точка реакции на маршрут...
        <Routes>
          <Route path="/ingredients/:id" element={<BurgerIngredientsCategoryItemModal ingredientId={ingridientId} />} />
          <Route path="/profile/orders/:orderNumber" element={<OrderDetailsModal orderNumber={orderNumber} />} />
          <Route path="/feed/:orderNumber" element={<OrderDetailsModal orderNumber={orderNumber} />} />
        </Routes>
      )}
    </div>
  </>);
}

// function HackRouter() {
//   const location = useLocation();
// }

export { App };
//export { AppWithStore as App };
