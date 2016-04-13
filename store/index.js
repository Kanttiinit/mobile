import Store from 'redux-nimble';

import actions from './actions';
import reducers from './reducers';

const defaultState = {
   currentView: 'RUOKALISTA',
   modal: {
      visible: false,
      component: undefined,
      style: undefined
   },
   selectedFavorites: []
};

export default new Store(reducers, actions, defaultState);
