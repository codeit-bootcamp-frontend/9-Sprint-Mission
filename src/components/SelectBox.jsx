import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectBox({ onChange }) {
  const [order, setOrder] = React.useState('');

  const handleChange = (event) => {
    const newOrder = event.target.value;
    setOrder(newOrder);
    onChange(newOrder === 1 ? 'recent' : 'favorite');
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">정렬</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={order} label="정렬" onChange={handleChange}>
          <MenuItem value={1}>최신순</MenuItem>
          <MenuItem value={2}>좋아요순</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
