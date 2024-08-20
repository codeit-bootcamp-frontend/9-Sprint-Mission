import React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = ({ value, onChange }) => {
  const handleClick = () => console.log('검색');
  return (
    <>
      <TextField
        id="filled-search"
        label="검색"
        type="search"
        size="small"
        variant="filled"
        placeholder="검색할 상품을 입력해 주세요."
        value={value}
        onChange={onChange}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleClick}>
              <SearchIcon position="end" />
            </IconButton>
          ),
        }}
      />
    </>
  );
};
export default SearchInput;
