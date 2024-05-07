import { Flex, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterForm from '../components/RegisterForm';
import Logo from '../components/Logo';
import { asyncRegisterUsers } from '../states/users/action';

export default function RegisterPage() {
  const routeChange = useNavigate();
  const dispatch = useDispatch();

  const manageRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUsers({ name, email, password }));

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
          <Heading>Create an account</Heading>
          <Text textAlign="center">
            Join Xweet Community & Unlock Your Voice!
          </Text>
        </Flex>
        <RegisterForm register={manageRegister} />
      </Flex>
    </Flex>
  );
}
