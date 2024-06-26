import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARD',
};

function fetchLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function asyncFetchLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(fetchLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      if (typeof window !== 'undefined') {
        window.alert(error.message);
      }
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  fetchLeaderboardsActionCreator,
  asyncFetchLeaderboards,
};
