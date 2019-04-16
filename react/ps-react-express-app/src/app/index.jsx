
// console.log(store.getState());

import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store';
import { Dashboard } from './components/Dashboard';

ReactDOM.render(
  <Dashboard />,
  document.getElementById('app')
);