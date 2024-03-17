import { useCallback, useState, useEffect } from "react";
import logo from "../../logo.svg";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import style from "./app.module.css";

const INGRIDIENTS_URL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [dataUrl, setDataUrl] = useState(null);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState({
    bun: [],
    main: [],
    sauce: [],
  });
  const [ingridients, setIngridients] = useState([]);

  async function loadIngridients() {
    if (!dataUrl) {
      return;
    }

    const response = await fetch(dataUrl)
      .then(async (result) => {
        if (!result.ok) {
          const resultText = await result.text();
          throw new Error(
            `http status ${result.status} ${result.statusText} ${resultText}`
          );
        }

        const resultJson = await result.json();
        const categories = resultJson.data.reduce(
          (memo, item, index) => {
            memo[item.type] = [...memo[item.type], item];
            return memo;
          },
          { bun: [], main: [], sauce: [] }
        );
        setIngridients(result.data);
        setCategories(categories);
      })
      .catch((error) => {
        setError(error);
      });
  }

  useEffect(() => {
    setDataUrl(INGRIDIENTS_URL);
    loadIngridients();
  }, [dataUrl]);

  const closeErrorModalHandler = useCallback(
    (e) => {
      setError(null);
      loadIngridients();
    },
    [dataUrl]
  );

  if (!error && ingridients && ingridients.length == 0) {
    return <img src={logo} className={style["App-logo"]} alt="logo" />;
  }

  return (
    <>
      <div className="app-wrapper">
        <AppHeader />
        <main>
          <section className="section-wrapper pb-10">
            <BurgerConstructor categories={categories} />
          </section>
          <section className="section-wrapper ml-10">
            <BurgerIngredients categories={categories} />
          </section>
        </main>
      </div>
      {error && (
        <Modal title="Ошибка получения данных" closeHandler={closeErrorModalHandler}>
          <p className="text text_type_main-medium m-3">{dataUrl}</p>
          <p className="text text_type_main-medium">
            {error.name}: {error.message}
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
