import moment from 'moment';

export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const UPDATE_NOW = 'UPDATE_NOW';
export const SET_CURRENT_VIEW = 'SET_CURRENT_VIEW';

export function updateNow() {
   return {
      type: UPDATE_NOW,
      payload: moment()
   };
}

export function updateLocation() {
   return {
      type: UPDATE_LOCATION,
      payload: new Promise((resolve, reject) => {
         navigator.geolocation.getCurrentPosition(
            position => resolve(position.coords),
            error => reject(error),
            {timeout: 3000, maximumAge: 60000}
         );
      })
   };
}

export function setCurrentView(view) {
   return {
      type: SET_CURRENT_VIEW,
      payload: view
   };
}
