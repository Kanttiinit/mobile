export const SEND_FEEDBACK = 'SEND_FEEDBACK';
export const SET_MESSAGE = 'SET_MESSAGE';

export function send(type, message) {
   return {
      type: SEND_FEEDBACK,
      payload: fetch('https://bot.kanttiinit.fi/feedback', {
         method: 'post',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
            message: `New feedback from app: "${type}":\n"${message}"`
         })
      })
      .then(r => r.json())
   };
}

export function setMessage(message) {
   return {
      type: SET_MESSAGE,
      payload: message
   };
}