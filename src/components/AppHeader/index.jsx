import {
  Logo,
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import "./style.css";

let AppHeader = () => {
  return (
    <header className="header">
      <nav className="buttons-block p-5">
        <div className="constructor button mt-4 mb-4">
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default ml-2">Конструктор</p>
        </div>
        <div className="line button mt-4 mb-4 ml-2">
          <ListIcon type="primary" />
          <p className="text text_type_main-default ml-2">Лента заказов</p>
        </div>
      </nav>
      <div className="logo-block">
        <Logo className="logo-block" />
      </div>
      <div className="buttons-block buttons-block__left p-5">
        <div className="profile button mt-4 mb-4 ml-2">
          <ListIcon type="primary" />
          <p className="text text_type_main-default ml-2">Личный кабинет</p>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
