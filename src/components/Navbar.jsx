import {
  Flex, Heading, Skeleton, useBreakpointValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import NavbarMenuMobile from './NavbarMenuMobile';
import NavbarMenu from './NavbarMenu';

export default function Navbar({ authUser, logOut }) {
  const isCompactScreen = useBreakpointValue({ base: true, md: false });
  const isLoading = useSelector((states) => states.loading);

  return (
    <Flex
      py={4}
      px={{ base: 4, sm: 6 }}
      w="100%"
      mx="auto"
      justify="space-between"
      align="center"
    >
      <Skeleton
        isLoaded={!isLoading}
        rounded="sm"
      >
        <Heading
          as={Link}
          to="/"
        >
          Xweet.
        </Heading>
      </Skeleton>
      {isCompactScreen ? (
        <Skeleton
          isLoaded={!isLoading}
          rounded="sm"
        >
          <NavbarMenuMobile
            authUser={authUser}
            logOut={logOut}
          />
        </Skeleton>
      ) : (
        <NavbarMenu
          authUser={authUser}
          logOut={logOut}
        />
      )}
    </Flex>
  );
}

const userShape = {
  id: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  avatar: PropTypes.string,
};

Navbar.propTypes = {
  authUser: PropTypes.shape(userShape),
  logOut: PropTypes.func,
};
