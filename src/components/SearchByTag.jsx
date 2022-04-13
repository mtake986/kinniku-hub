import React from 'react';
import { ioSearchOutline } from '../icons/icons';

const SearchByTag = ({ handleSearchByTag, searchByTag, searchByTagSubmitted, setSearchByTagSubmitted }) => {
  const hanldeSubmit = () => {
    setSearchByTagSubmitted(true);
    console.log("submit!! searchByTagSubmitted: ", searchByTagSubmitted)
  }
  return (
    <div className='searchByTag'>
      <input
        onChange={handleSearchByTag}
        type='text'
        placeholder='Tag'
        className={
          searchByTagSubmitted === true
            ? 'searchTagInput searchByTagSubmitted'
            : 'searchTagInput'
        }
      />
      <i className={searchByTag === "" ? "noInputYet" : ""} onClick={hanldeSubmit}>
        {ioSearchOutline}
      </i>
    </div>
  );
};

export default SearchByTag;
