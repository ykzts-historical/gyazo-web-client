async function showAlertAction(context, { type, message }) {
  context.dispatch('SET_ALERT_MESSAGE', { type, message });
}

export default showAlertAction;
