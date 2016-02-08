'use strict';

import HttpCache from '../managers/HttpCache';

export const changeView = view => ({
   type: 'CHANGE_VIEW',
   view
});

export const showModal = component => ({
   type: 'SHOW_MODAL',
   component
});

export const dismissModal = () => ({
   type: 'DISMISS_MODAL'
});

export const getAreas = () => {
   return dispatch => {
      dispatch({
         type: 'SET_AREAS_LOADING',
         loading: true
      });

      return HttpCache.get('areas', 'https://api.kanttiinit.fi/areas', {days: '1'})
      .then(areas => {
         dispatch({
            type: 'SET_AREAS_LOADING',
            loading: false
         });

         dispatch({
            type: 'SET_AREAS',
            areas
         });
      });
   };
};
