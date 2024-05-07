import {
  Avatar, Flex, IconButton, Text,
} from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { postedAt } from '../utils/index';

export default function ThreadCommentItem({
  id,
  owner,
  createdAt,
  content,
  upVote,
  downVote,
  upVotesBy,
  authUser,
}) {
  const manageUpVoteClick = () => {
    upVote(id);
  };

  const manageDownVoteClick = () => {
    downVote(id);
  };

  const isCommentVoted = upVotesBy?.includes(authUser?.id);

  return (
    <Flex
      direction="column"
      w="100%"
    >
      <Flex
        w="100%"
        align="center"
        justify="space-between"
        mb="2"
      >
        <Flex
          align="center"
          gap="4"
        >
          <Avatar
            name="Dimas Yusuf Qurohman"
            size="sm"
            rounded="sm"
          />
          <Text as="b">{owner?.name}</Text>
        </Flex>
        <Text fontSize="sm">{postedAt(createdAt)}</Text>
      </Flex>
      <Text mb="2">{parse(`${content}`)}</Text>
      <Flex
        gap="4"
        align="center"
      >
        <IconButton
          icon={<ArrowUpIcon />}
          rounded="sm"
          size="sm"
          onClick={manageUpVoteClick}
          bg={isCommentVoted ? 'gray.700' : 'gray.100'}
          color={isCommentVoted ? 'white' : 'black'}
          _focus={{ bg: 'gray.700', color: 'white' }}
        />
        <Text>{upVotesBy?.length}</Text>
        <IconButton
          icon={<ArrowDownIcon />}
          rounded="sm"
          size="sm"
          onClick={manageDownVoteClick}
        />
      </Flex>
    </Flex>
  );
}

ThreadCommentItem.propTypes = {
  id: PropTypes.string,
  owner: PropTypes.object,
  createdAt: PropTypes.string,
  content: PropTypes.string,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  upVotesBy: PropTypes.array,
  authUser: PropTypes.object,
};
