import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  SET_USER: 'SET_USER',
  UNSET_USER: 'UNSET_USER',
  SET_ERROR: 'SET_ERROR',
};

function setUserActionCreator(authUser) {
  return {
    type: ActionType.SET_USER,
    payload: {
      authUser,
    },
  };
}



function unsetUserActionCreator() {
  return {
    type: ActionType.UNSET_USER,
  };
}

function asyncSetUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setUserActionCreator(authUser));
    } catch (error) {
      dispatch(setErrorActionCreator(error));
    }
    dispatch(hideLoading());
  };
}

function asyncUnsetUser() {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(unsetUserActionCreator());
    api.putAccessToken('');
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  setUserActionCreator,
  unsetUserActionCreator,
  asyncSetUser,
  asyncUnsetUser,
  setErrorActionCreator,
};
