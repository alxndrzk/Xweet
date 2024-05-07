const ActionType = {
  SHOW_LOADING: 'SHOW_LOADING',
  HIDE_LOADING: 'HIDE_LOADING',
};

function showLoadingSkeleton() {
  return {
    type: ActionType.SHOW_LOADING,
    payload: {
      isLoading: true,
    },
  };
}

function hideLoadingSkeleton() {
  return {
    type: ActionType.HIDE_LOADING,
    payload: {
      isLoading: false,
    },
  };
}

export { ActionType, showLoadingSkeleton, hideLoadingSkeleton };
