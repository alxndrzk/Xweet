import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { fetchThreads } from '../threads/action';
import { fetchUsers } from '../users/action';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(fetchUsers(users));
      dispatch(fetchThreads(threads));
    } catch (error) {
      if (typeof window !== 'undefined') {
        window.alert(error.message);
      }
    }
    dispatch(hideLoading());
  };
}

export { asyncPopulateUsersAndThreads };
