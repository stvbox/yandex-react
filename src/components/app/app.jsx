import "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import burgersList from "../../utils/data";

function App() {
  const itemsCategories = { bun: [], main: [], sauce: [] };
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
