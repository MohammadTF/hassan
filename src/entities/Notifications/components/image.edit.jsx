/* eslint-disable react/prop-types */
import React from 'react';
import { DropZone, Label, Box } from '@admin-bro/design-system';
// import { Label, Box, DropZone } from 'admin-bro';

const Edit = (props) => {
  const { property, onChange, record } = props;

  const handleDropZoneChange = (files) => {
    onChange('image', files[0]);
  };
  return (
    <Box>
      <Label>{property.label}</Label>
      {
      record.params.image
      && <img src={record.params.image} alt="" style={{ width: '100px' }} />
      }

      <DropZone onChange={handleDropZoneChange} />
    </Box>
  );
};

export default Edit;
