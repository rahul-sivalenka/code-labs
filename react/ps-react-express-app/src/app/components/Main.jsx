import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { Dashboard } from './Dashboard';

export const Main = () => (
  <Provider store={store}>
    <div>
      <Dashboard />
    </div>
  </Provider>
);