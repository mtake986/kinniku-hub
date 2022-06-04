import { useContext } from 'react';
import { FilterInputsContext } from '../../../../contexts/quiz/FilterInputsContext';

const Tag = () => {
  const { handleSearchByTag, searchByTag } = useContext(FilterInputsContext);
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

export default Tag;
