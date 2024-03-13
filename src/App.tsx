import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppHeader from "./components/header/header";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import burgersList from "./utils/data";

interface IMenuItem {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

interface ICategories {
  [index: string]: IMenuItem[];
}

function App() {
  const itemsCategories: ICategories = { bun: [], main: [], sauce: [] };
  burgersList.reduce((memo, item, index) => {
    const type = item.type;
    memo[type].push(item);
    return memo;
  }, itemsCategories);

  return (
    <div className="app-wrapper">
      <AppHeader />
      <main>
        <BurgerConstructor categories={itemsCategories} />
        <BurgerIngredients categories={itemsCategories} />
      </main>
    </div>
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
