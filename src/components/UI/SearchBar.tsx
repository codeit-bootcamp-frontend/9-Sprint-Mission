import React, { useState } from 'react';
import SearchIcon from '@/images/icons/ic_search.svg';

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='relative w-full'>
      <SearchIcon className='absolute left-3 top-2.5' />
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder='게시글 검색...'
        className='border border-gray-300 rounded-md p-2 pl-10 w-full'
      />
    </div>
  );
};

export default SearchBar;
