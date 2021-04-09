import React from 'react';
import { Box } from '@admin-bro/design-system';
import { unflatten } from 'flat';

const List = (props) => {
  const { property, record } = props;
  const { images } = unflatten(record.params);
 
  return (
    <Box>
      {images.map(o=> <img src={o} alt={o} style={{width: '100px'}}/> )}
    </Box>
  );
};

export default List;
