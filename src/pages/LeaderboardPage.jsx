import { Flex, Heading } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Logo from '../components/Logo';
import LeaderboardList from '../components/LeaderboardList';
import { asyncFetchLeaderboards } from '../states/leaderboards/action';

export default function LeaderboardPage() {
  const { leaderboards = [] } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncFetchLeaderboards());
  }, [dispatch]);

  return (
    <Flex
      justify="center"
      align="center"
      py={{ base: 4, sm: 6 }}
      px={{ base: 4, sm: 6 }}
    >
      <Flex
        direction="column"
        w="100%"
        maxWidth="768px"
        align="center"
      >
        <Flex
          direction="column"
          justify="center"
          align="center"
          w="100%"
        >
          <Logo />
          <Heading mb="8">Xweet. League</Heading>
          <LeaderboardList leaderboards={leaderboards} />
        </Flex>
      </Flex>
    </Flex>
  );
}
