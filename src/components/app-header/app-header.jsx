import {
  Logo,
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={style.header}>
      <nav className={`${style["buttons-block"]} p-5`}>
        <div className={`${style["constructor"]} ${style["button"]} mt-4 mb-4`}>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default ml-2">Конструктор</p>
        </div>
        <div className={`${style["line"]} ${style["button"]} mt-4 mb-4 ml-2`}>
          <ListIcon type="primary" />
          <p className="text text_type_main-default ml-2">Лента заказов</p>
        </div>
      </nav>
      <div className={style["logo-block"]}>
        <Logo />
      </div>
      <div
        className={`${style["buttons-block"]} ${style["buttons-block__left"]} p-5`}
      >
        <div
          className={`${style["profile"]} ${style["button"]} mt-4 mb-4 ml-2`}
        >
          <ListIcon type="primary" />
          <p className="text text_type_main-default ml-2">Личный кабинет</p>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
