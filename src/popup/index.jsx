import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import store from './redux/store';

import Popup from './Popup';
import CotentModal from "../content/modal";

import './index.css';
import '../assets/styles/tailwind.css';

render(
  <Provider store={store}>
    <CotentModal />
  </Provider>
  , window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
