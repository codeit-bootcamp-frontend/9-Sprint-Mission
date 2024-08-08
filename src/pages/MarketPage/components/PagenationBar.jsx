import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export const PagenationBar = ({ page, totalPages, onPageChange }) => {
  return (
    <Stack spacing={2} style={{ alignItems: 'center' }}>
      <Pagination count={totalPages} page={page} onChange={(event, value) => onPageChange(value)} color="primary" />
    </Stack>
  );
};
