export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_DISMISS = 'MODAL_DISMISS';

export const dismissModal = () => ({type: MODAL_DISMISS});

export const openModal = (component, style) => ({
  type: MODAL_OPEN,
  payload: {component, style}
});
