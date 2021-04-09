import React from 'react';
import {  Label, Box } from '@admin-bro/design-system'
// import { Label, Box, DropZone } from 'admin-bro';

const List = (props) => {
  const { property, record } = props;
 
  return (
    <Box>
      <img src={record.params.image} style={{width: '100px'}}/>
    </Box>
  );
};

export default List;
