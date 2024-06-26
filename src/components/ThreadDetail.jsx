import {
  Avatar, Button, Flex, Icon, IconButton, Text,
} from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon, ChatIcon } from '@chakra-ui/icons';
import { BiDotsVertical } from 'react-icons/bi';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { postedAt } from '../utils/index';

export default function ThreadDetail({
  id,
  title,
  body,
  createdAt,
  owner,
  comments,
  upVotesBy,
  upVote,
  downVote,
  authUser,
}) {
  const manageUpVoteClick = () => {
    upVote(id);
  };

  const manageDownVoteClick = () => {
    downVote(id);
  };

  const isThreadVote = upVotesBy?.includes(authUser?.id);

  return (
    <Flex
      direction="column"
      w="100%"
    >
      <Flex
        w="100%"
        mb="2"
        justify="space-between"
      >
        <Flex gap="4">
          <Avatar
            name={owner?.name}
            rounded="sm"
          />
          <Flex direction="column">
            <Text
              as="b"
              fontSize="lg"
              noOfLines="1"
              w="100%"
            >
              {owner?.name}
            </Text>
            <Text fontSize="sm">{postedAt(createdAt)}</Text>
          </Flex>
        </Flex>
        <Icon
          as={BiDotsVertical}
          w="24px"
          h="24px"
        />
      </Flex>
      <Flex direction="column">
        <Text
          as="b"
          fontSize="lg"
        >
          {title}
        </Text>
        <Text
          mb="2"
          textAlign="justify"
        >
          {parse(`${body}`)}
        </Text>
      </Flex>
      <Flex
        gap={{ base: 4, sm: 8 }}
        align="center"
      >
        <Flex
          gap="4"
          align="center"
        >
          <IconButton
            icon={<ArrowUpIcon />}
            rounded="sm"
            size="sm"
            onClick={manageUpVoteClick}
            bg={isThreadVote ? 'gray.700' : 'gray.100'}
            color={isThreadVote ? 'white' : 'black'}
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
        <Button
          leftIcon={<ChatIcon />}
          rounded="sm"
          fontWeight="normal"
          size="sm"
        >
          {comments?.length}
        </Button>
      </Flex>
    </Flex>
  );
}

ThreadDetail.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  createdAt: PropTypes.string,
  owner: PropTypes.object,
  comments: PropTypes.array,
  upVotesBy: PropTypes.array,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  authUser: PropTypes.object,
};
