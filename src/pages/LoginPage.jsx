import { Flex, Heading, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import Logo from '../components/Logo';
import { asyncSetUser } from '../states/authUser/action';

export default function LoginPage() {
  const routeChange = useNavigate();
  const dispatch = useDispatch();

  const manageLogin = ({ email, password }) => {
    dispatch(asyncSetUser({ email, password }));
    routeChange('/');
  };

  return (
    <Flex
      w="100%"
      h="100dvh"
      align="center"
      justify="center"
      p="6"
    >
      <Flex
        direction="column"
        w={{ base: '100%', md: '448px' }}
        h="100vh"
        justify="center"
      >
        <Flex
          direction="column"
          mb="8"
          justify="center"
          align="center"
        >
          <Logo />
          <Heading>Welcome Back</Heading>
          <Text textAlign="center">Login to continue using Xweet App.</Text>
        </Flex>
        <LoginForm aunthenticate={manageLogin} />
      </Flex>
    </Flex>
  );
}
