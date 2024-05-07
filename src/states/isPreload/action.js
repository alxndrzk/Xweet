import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

import { setUserActionCreator } from '../authUser/action';
import {
  showLoadingSkeleton,
  hideLoadingSkeleton,
} from '../loading/action';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreload(isPreLoad) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreLoad,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    try {
      dispatch(showLoadingSkeleton());
      dispatch(showLoading());
      // preload process
      const authUser = await api.getOwnProfile();
      dispatch(setUserActionCreator(authUser));
    } catch (error) {
      // fallback process
      dispatch(setUserActionCreator(null));
    } finally {
      // end preload process
      dispatch(setIsPreload(false));
    }

    setTimeout(() => {
      dispatch(hideLoadingSkeleton());
      dispatch(hideLoading());
    }, 3000);
  };
}

export { ActionType, setIsPreload, asyncPreloadProcess };
