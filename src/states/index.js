import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import userReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadsReducer from './threads/reducer';
import threadDetailReducer from './threadDetail/reducer';
import commentsReducer from './comments/reducer';
import usersReducer from './users/reducer';
import leaderboardReducer from './leaderboards/reducer';
import loadingReducer from './loading/reducer';

const store = configureStore({
  reducer: {
    authUser: userReducer,
    isPreload: isPreloadReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    comments: commentsReducer,
    users: usersReducer,
    leaderboards: leaderboardReducer,
    loading: loadingReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
