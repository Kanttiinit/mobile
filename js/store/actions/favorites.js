export const SET_SELECTED_FAVORITE = 'SET_SELECTED_FAVORITE';

export function setIsSelected(value, include) {
   return {
      type: SET_SELECTED_FAVORITE,
      payload: {value, include}
   };
}
