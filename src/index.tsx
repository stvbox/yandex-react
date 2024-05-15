import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/app/app";
import { BrowserRouter } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Provider, useDispatch } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { compose } from 'redux';
import { authReducer } from "./services/reducers/auth";
import { ordersReducer } from "./services/reducers/orders";
import { constructorReducer } from "./services/reducers/constructor";
import { ingredientsReducer } from "./services/reducers/ingredients";
import { configureStore } from "@reduxjs/toolkit";
import "./index.css";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// const enhencer = compose(
//   applyMiddleware(thunk),
//   window.__REDUX_DEVTOOLS_EXTENSION__
//     ? window.__REDUX_DEVTOOLS_EXTENSION__()
//     : args => args,
// );
// const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);
// createStore(rootReducer, {}, composeEnhancers);

//const store = createStore(rootReducer, compose());

// const store = createStore(rootReducer, composeWithDevTools(
//   applyMiddleware(...middleware),
//   // other store enhancers if any
// ));

// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__
//       ? window.__REDUX_DEVTOOLS_EXTENSION__()
//       : args => args,
//   ),
// );

// const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);
// const store = createStore(rootReducer, {},
//   composeEnhancers(
//     applyMiddleware(thunk),
//   ),
// );

export const store = configureStore({
  reducer: {
    constructer: constructorReducer,
    ingredients: ingredientsReducer,
    orders: ordersReducer,
    auth: authReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
