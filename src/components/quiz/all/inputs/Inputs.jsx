import { useContext } from 'react';

import Category from './Category'
import Tag from './Tag'
import User from './User'
import { FilterInputsContext } from '../../../../contexts/quiz/FilterInputsContext';
import { ioSearchOutline } from '../../../../icons/icons';

const Inputs = () => {
  const { handleFilter } = useContext(FilterInputsContext);

  return (
    <div className='searchContainer'>
      <span>Filter</span>
      <div className="inputs">
        <Category />
        <span className="border">|</span>
        <Tag />
        <span className="border">|</span>
        <User />
        <span className="border">|</span>
        <div className='submitBtn' onClick={handleFilter}>
          {ioSearchOutline}
        </div>
      </div>
    </div>
  )
}

export default Inputs