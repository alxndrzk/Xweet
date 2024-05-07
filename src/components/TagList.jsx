import { SimpleGrid } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import TagItem from './TagItem';

export default function TagList({ label, onClickLabel, activeLabel }) {
  return (
    <SimpleGrid
      columns={{ base: 2 }}
      w="100%"
      maxWidth={{ base: '100%', md: '300px' }}
      gap="2"
      h="100%"
    >
      {label?.map((label, index) => (
        <TagItem
          key={index}
          label={label}
          onClickLabel={onClickLabel}
          activeLabel={activeLabel}
        />
      ))}
    </SimpleGrid>
  );
}

TagList.propTypes = {
  label: PropTypes.array,
  onClickLabel: PropTypes.func,
  activeLabel: PropTypes.string,
};
