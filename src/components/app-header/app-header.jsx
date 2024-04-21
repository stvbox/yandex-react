import { useSelector } from "react-redux";
import {
  Logo,
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./app-header.module.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function AppHeader() {
  //const navigate = useNavigate();

  const { name } = useSelector(store => ({
    name: store.burgerAuth.name,
  }));

  return (
    <header className={style.header}>
      <nav className={`${style["buttons-block"]} p-5`}>
        <div className={`${style["constructor"]} ${style["button"]} mt-4 mb-4`}>
          <BurgerIcon type="primary" />
          <NavLink to={`/`} className={({ isActive }) => isActive ? 'active' : ''} >
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </NavLink>
        </div>
        <div className={`${style["line"]} ${style["button"]} mt-4 mb-4 ml-2`}>
          <ListIcon type="primary" />
          <NavLink to={'/profile/orders'} className={({ isActive }) => isActive ? 'active' : ''} >
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </NavLink>
        </div>
      </nav>
      <div className={style["logo-block"]} >
        <NavLink to={'/'}>
          <Logo />
        </NavLink>
      </div>
      <div
        className={`${style["buttons-block"]} ${style["buttons-block__left"]} p-5`}
      >
        <div
          className={`${style["profile"]} ${style["button"]} mt-4 mb-4 ml-2`}
        >
          <ListIcon type="primary" />
          <NavLink to={`/profile`} className={({ isActive }) => isActive ? 'active' : ''} >
            {({ isActive }) => (
              <p className="text text_type_main-default ml-2">
                {name ? name : 'Личный кабинет'}
              </p>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
}
