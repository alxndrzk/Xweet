import { Flex } from '@chakra-ui/react';
import PropTypes, { object } from 'prop-types';
import LeaderboardItem from './LeaderboardItem';

export default function LeaderboardList({ leaderboards }) {
  return (
    <Flex
      w="100%"
      direction="column"
      gap="4"
    >
      {leaderboards?.map((leaderboard, position) => (
        <LeaderboardItem
          key={position}
          index={position}
          {...leaderboard}
        />
      ))}
    </Flex>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(object),
};
