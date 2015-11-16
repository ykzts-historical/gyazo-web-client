let handleErrorAction = async (context, payload) => {
  context.dispatch('HANDLE_ERROR', payload);
};

export default handleErrorAction;
