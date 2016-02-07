'use strict';

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
