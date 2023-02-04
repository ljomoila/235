export const reduce = (previousState, updatedState) => {
  return {
    ...previousState,
    ...updatedState
  };
};
