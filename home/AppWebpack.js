//import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import '@config';
import store from '@redux/store';

import App from './src/app/indexWebpack';

const persistor = persistStore(store);

export default function index({ HomeNavigator }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App HomeNavigator={HomeNavigator} />
      </PersistGate>
    </Provider>
  );
}
