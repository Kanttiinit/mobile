'use strict';

import React from 'react-native';
import {Provider} from 'react-redux';
import Router from './Router';
import store from './store';

const Main = props => (
   <Provider store={store}>
      <Router />
   </Provider>
);

export default Main;
