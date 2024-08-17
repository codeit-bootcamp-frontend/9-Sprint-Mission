import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export const PagenationBar = ({ totalPages, onPageChange }) => {
  return (
    <Stack spacing={2} style={{ alignItems: 'center' }}>
      <Pagination count={totalPages} onChange={(event, page) => onPageChange(page)} color="primary" />
    </Stack>
  );
};
