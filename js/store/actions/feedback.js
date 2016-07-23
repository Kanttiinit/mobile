export function send(type, message) {
   return {
      type: 'SEND_FEEDBACK',
      payload: fetch('https://bot.kanttiinit.fi/feedback', {
         method: 'post',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
            message: `New feedback from app: "${type}":\n"${message}"`
         })
      }).then(r => r.json()),
      meta: {
         data: 'feedback'
      }
   };
}

export function setFeedbackMessage(feedbackMessage) {
   return {
      type: 'SET_VALUE_FEEDBACK_MESSAGE',
      payload: {feedbackMessage}
   }
}
