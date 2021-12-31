import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { configureStore } from '@reduxjs/toolkit'

import { Provider } from 'react-redux'

import productsReducer from './features/productsSlice'
import { productFetch } from './features/productsSlice';
import { productsApi } from './features/productsApi';
import cartReducer, { getTotals } from './features/cartSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,

  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(productsApi.middleware),
})

store.dispatch(productFetch());
store.dispatch(getTotals());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
