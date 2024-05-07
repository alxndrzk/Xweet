import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TagList from '../components/TagList';
import ThreadList from '../components/ThreadList';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import {
  asyncAddThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
} from '../states/threads/action';

export default function HomePage() {
  const isCompactScreen = useBreakpointValue({ base: true, md: false });

  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const manageAddThread = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }));
  };

  const manageUpVote = (threadId) => {
    dispatch(asyncUpVoteThread(threadId));
  };

  const manageDownVote = (threadId) => {
    dispatch(asyncDownVoteThread(threadId));
  };

  const threadsList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread?.ownerId),
    authUser: authUser.id,
  }));

  const [searchParams, setSearchParams] = useSearchParams();
  const params = searchParams.get('category');
  const categories = threads.map((thread) => thread?.category);
  const categoriesList = [...new Set(categories)];

  const onClickLabel = (category) => {
    if (params === category) {
      setSearchParams('');
    } else {
      setSearchParams({ category });
    }
  };

  const filteredThreads = threadsList.filter((thread) => thread?.category.includes(params));

  return (
    <Flex
      direction="row"
      py={{ base: 4, sm: 6 }}
      px={{ base: 4, sm: 6 }}
      gap="8"
    >
      {isCompactScreen === false && (
        <TagList
          label={categoriesList}
          onClickLabel={onClickLabel}
          activeLabel={params}
        />
      )}
      <ThreadList
        authUser={authUser}
        threads={params ? filteredThreads : threadsList}
        addThread={manageAddThread}
        upVote={manageUpVote}
        downVote={manageDownVote}
        label={categoriesList}
        onClickLabel={onClickLabel}
        activeLabel={params}
      />
    </Flex>
  );
}
