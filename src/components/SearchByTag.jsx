import React from 'react';

const SearchByTag = ({ handleSearchByTag, searchByTag }) => {
  return (
    <div className='searchByTag'>
      <input
        onChange={handleSearchByTag}
        type='text'
        placeholder='Tag'
        className={
          searchByTag !== ''
            ? 'searchTagInput notDefaultValue'
            : 'searchTagInput'
        }
      />
    </div>
  );
};

export default SearchByTag;
