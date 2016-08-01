export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_DISMISS = 'MODAL_DISMISS';

export function dismissModal() {
  return {type: MODAL_DISMISS};
}

export function openModal(component, style) {
  return {
    type: MODAL_OPEN,
    payload: {component, style}
  };
}
