import { ActionType } from './action';

function userReducer(authUser = null, action = {}) {
  switch (action.type) {
    case ActionType.SET_USER:
      return action.payload.authUser;
    case ActionType.UNSET_USER:
      return null;
    default:
  }
}

export default userReducer;
