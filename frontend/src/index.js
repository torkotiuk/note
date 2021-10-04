import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/bootstrap.min.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import Favicon from 'react-favicon';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Favicon url="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-notes-business-kiranshastry-lineal-color-kiranshastry-1.png" />
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
