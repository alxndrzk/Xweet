import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ThreadComment from '../components/ThreadComment';
import ThreadDetail from '../components/ThreadDetail';
import {
  asyncDownVoteThreadDetail,
  asyncFetchThreadDetail,
  asyncUpVoteThreadDetail,
} from '../states/threadDetail/action';
import {
  asyncAddComments,
  asyncUpVoteComments,
  asyncDownVoteComments,
} from '../states/comments/action';

export default function DetailPage() {
  const { id } = useParams();
  const { threadDetail = null, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncFetchThreadDetail(id));
  }, [id, dispatch]);

  const manageUpVote = (threadId) => {
    dispatch(asyncUpVoteThreadDetail(threadId));
  };

  const manageDownVote = (threadId) => {
    dispatch(asyncDownVoteThreadDetail(threadId));
  };

  const manageAddComment = (content) => {
    dispatch(asyncAddComments({ threadId: id, content }));
  };

  const manageUpVoteComment = (commentId) => {
    dispatch(asyncUpVoteComments({ threadId: id, commentId }));
  };

  const manageDownVoteComment = (commentId) => {
    dispatch(asyncDownVoteComments({ threadId: id, commentId }));
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <Flex
      direction="column"
      w="100%"
      maxWidth="768px"
      margin="auto"
      px={{ base: 4, sm: 6 }}
      py={{ base: 4, sm: 6 }}
      gap="4"
    >
      <ThreadDetail
        {...threadDetail}
        authUser={authUser}
        upVote={manageUpVote}
        downVote={manageDownVote}
      />
      <ThreadComment
        {...threadDetail}
        authUser={authUser}
        addComment={manageAddComment}
        upVoteComment={manageUpVoteComment}
        downVoteComment={manageDownVoteComment}
      />
    </Flex>
  );
}
