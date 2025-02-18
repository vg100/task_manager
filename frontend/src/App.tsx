import React from 'react';
import { Provider } from 'react-redux';
import {
  StyleSheet,
} from 'react-native';
import Router from "./navigation"


import store from './redux/store';



function App() {
 
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
