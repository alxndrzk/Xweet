import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { fetchThreadDetailActionCreator } from '../threadDetail/action';

const ActionType = {
  ADD_COMMENT: 'ADD_COMMENT',
  UPVOTE_COMMENT: 'UPVOTE_COMMENT',
  DOWNVOTE_COMMENT: 'DOWNVOTE_COMMENT',
};

function addCommentsActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function upVoteCommentsActionCreator({ commentId, userId }) {
  return {
    type: ActionType.UPVOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function downVoteCommentsActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DOWNVOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncAddComments(content) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { threadDetail } = getState();

    try {
      const comment = await api.createComment(content);
      dispatch(addCommentsActionCreator(comment));
      const newThreadDetail = await api.getDetailThread(threadDetail.id);
      dispatch(fetchThreadDetailActionCreator(newThreadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpVoteComments(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    dispatch(upVoteCommentsActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.upVoteComment(commentId);
      const newThreadDetail = await api.getDetailThread(threadDetail.id);
      dispatch(fetchThreadDetailActionCreator(newThreadDetail));
    } catch (error) {
      alert(error.message);
      dispatch(upVoteCommentsActionCreator({ commentId, userId: authUser.id }));
    }
    dispatch(hideLoading());
  };
}

function asyncDownVoteComments(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    dispatch(downVoteCommentsActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.downVoteComment(commentId);
      const newThreadDetail = await api.getDetailThread(threadDetail.id);
      dispatch(fetchThreadDetailActionCreator(newThreadDetail));
    } catch (error) {
      alert(error.message);
      dispatch(
        downVoteCommentsActionCreator({ commentId, userId: authUser.id }),
      );
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  addCommentsActionCreator,
  upVoteCommentsActionCreator,
  downVoteCommentsActionCreator,
  asyncAddComments,
  asyncUpVoteComments,
  asyncDownVoteComments,
};
