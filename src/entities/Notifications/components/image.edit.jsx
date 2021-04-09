import React from 'react';
import { DropZone, Label, Box } from '@admin-bro/design-system'
// import { Label, Box, DropZone } from 'admin-bro';

const Edit = (props) => {
  const { property, onChange } = props;

  const handleDropZoneChange = (files) => {
    onChange('image', files[0]);
  };
  return (
    <Box>
      <Label>{property.label}</Label>
      <DropZone onChange={handleDropZoneChange} />
    </Box>
  );
};

export default Edit;
