import { Button, Skeleton } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function TagItem({ label, onClickLabel, activeLabel }) {
  const isLoading = useSelector((states) => states.loading);

  return (
    <Skeleton
      isLoaded={!isLoading}
      rounded="sm"
    >
      <Button
        w="100%"
        bg={activeLabel === label ? 'gray.700' : 'white'}
        color={activeLabel === label ? 'white' : 'black'}
        rounded="sm"
        borderWidth="2px"
        borderColor="gray.700"
        _hover={
          activeLabel === label
            ? { bg: 'white', color: 'black' }
            : { bg: 'gray.700', color: 'white' }
        }
        noOfLines="1"
        onClick={() => onClickLabel(label)}
      >
        {label}
      </Button>
    </Skeleton>
  );
}

TagItem.propTypes = {
  label: PropTypes.string,
  onClickLabel: PropTypes.func,
  activeLabel: PropTypes.string,
};
