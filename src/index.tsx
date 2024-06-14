import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/app/app";
import { BrowserRouter } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Provider, useDispatch, useSelector } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { compose } from 'redux';
import { authReducer } from "./services/reducers/auth";
import { ordersReducer } from "./services/reducers/orders";
import { constructorReducer } from "./services/reducers/constructor";
import { ingredientsReducer } from "./services/reducers/ingredients";
import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "./services/socketMiddleware";
import { IOrdersSocketActions } from "./services/socketMiddleware";
import "./index.css";
import { OrderActions } from "./services/reducers/orders.types";


const FEED_WS_URL = 'wss://norma.nomoreparties.space/orders/all';
const ORDERS_WS_URL = 'wss://norma.nomoreparties.space/orders?token=${accessToken}';

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

const feedActions: IOrdersSocketActions = {
  WS_CONNECTION_START: OrderActions.WS_FEED_START,
  WS_CONNECTION_CLOSE: OrderActions.WS_FEED_CLOSED,
  WS_CONNECTION_SUCCESS: OrderActions.WS_FEED_SUCCESS,
  WS_CONNECTION_ERROR: OrderActions.WS_FEED_ERROR,
  WS_GET_MESSAGE: OrderActions.WS_FEED_MESSAGE,
  WS_SEND_MESSAGE: OrderActions.WS_FEED_SEND_MESSAGE,
};
const orderActions: IOrdersSocketActions = {
  WS_CONNECTION_START: OrderActions.WS_ORDERS_START,
  WS_CONNECTION_CLOSE: OrderActions.WS_ORDERS_CLOSED,
  WS_CONNECTION_SUCCESS: OrderActions.WS_ORDERS_SUCCESS,
  WS_CONNECTION_ERROR: OrderActions.WS_ORDERS_ERROR,
  WS_GET_MESSAGE: OrderActions.WS_ORDERS_MESSAGE,
  WS_SEND_MESSAGE: OrderActions.WS_ORDERS_SEND_MESSAGE
};

export const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .prepend(socketMiddleware(FEED_WS_URL, feedActions))
      .prepend(socketMiddleware(ORDERS_WS_URL, orderActions));
  },
  reducer: {
    constructer: constructorReducer,
    ingredients: ingredientsReducer,
    orders: ordersReducer,
    auth: authReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

//const BASE_URL = '/yandex-react';
const BASE_URL = '/';

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    // <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter basename={BASE_URL} >
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </BrowserRouter>
      </Provider>
    // </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
