import { Flex, Image } from '@chakra-ui/react';

export default function Logo() {
  return (
    <Flex mb="2">
      <Image
        src="xweet.png"
        alt="xweet logo"
        w="48px"
        h="48px"
      />
    </Flex>
  );
}
