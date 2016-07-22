import moment from 'moment';

export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const UPDATE_NOW = 'UPDATE_NOW';
export const SET_KEYBOARD_VISIBLE = 'SET_KEYBOARD_VISIBLE';
export const SET_CURRENT_VIEW = 'SET_CURRENT_VIEW';
export const SET_DAY_OFFSET = 'SET_DAY_OFFSET';

export function updateNow() {
   return {
      type: UPDATE_NOW,
      payload: new Date()
   };
}

export function updateLocation() {
   return {
      type: UPDATE_LOCATION,
      payload: new Promise((resolve, reject) => {
         navigator.geolocation.getCurrentPosition(
            position => resolve(position.coords),
            error => console.log('could not get location', error),
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

export function setKeyboardVisible(visible) {
   return {
      type: SET_KEYBOARD_VISIBLE,
      payload: visible
   };
}

export function setDayOffset(day) {
   return {
      type: SET_DAY_OFFSET,
      payload: day
   };
}
