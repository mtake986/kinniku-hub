import React from 'react';

const SearchByTag = ({ handleSearchByTag, searchByTag }) => {
  return (
    <div className='searchByTagContainer'>
      <input
        onChange={handleSearchByTag}
        type='text'
        placeholder='Tag'
        className={
          searchByTag !== ''
            ? 'searchTagInput chosen'
            : 'searchTagInput'
        }
      />
    </div>
  );
};

export default SearchByTag;
