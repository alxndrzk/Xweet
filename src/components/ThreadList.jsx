import { Flex, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ThreadModal from './ThreadModal';
import TagModal from './TagModal';
import ThreadItem from './ThreadItem';

export default function ThreadList({
  threads,
  addThread,
  upVote,
  downVote,
  label,
  onClickLabel,
  activeLabel, // Add 'params' prop
  authUser,
}) {
  const isCompactScreen = useBreakpointValue({ base: true, md: false });
  const isLoading = useSelector((states) => states.loading);

  return (
    <Flex
      direction="column"
      w="100%"
      gap="6"
    >
      <Flex
        w="100%"
        gap="4"
      >
        <ThreadModal addThread={addThread} />
        {isCompactScreen && (
          <Skeleton
            isLoaded={!isLoading}
            rounded="sm"
          >
            <TagModal
              label={label}
              onClickLabel={onClickLabel}
              activeLabel={activeLabel}
            />
          </Skeleton>
        )}
      </Flex>
      <Flex
        direction="column"
        gap="4"
      >
        {threads.map((thread) => (
          <ThreadItem
            key={thread.id}
            {...thread}
            upVote={upVote}
            downVote={downVote}
            authUser={authUser}
          />
        ))}
      </Flex>
    </Flex>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.array,
  addThread: PropTypes.func,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  label: PropTypes.array,
  onClickLabel: PropTypes.func,
  activeLabel: PropTypes.string,
  authUser: PropTypes.object,
};
