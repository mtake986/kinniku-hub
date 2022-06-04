import { useContext } from 'react';
import { FilterInputsContext } from '../../../../contexts/quiz/FilterInputsContext';

const Category = () => {
  const { handleSearchByCategory, searchByCategory, categories } = useContext(FilterInputsContext);
  return (
    <select
      name='category'
      onChange={handleSearchByCategory}
      className={
        searchByCategory !== '' && searchByCategory !== 'all'
          ? 'chosen'
          : ''
      }
    >
      <option defaultValue disabled>
        Select a Category
      </option>
      <option value=''>All</option>
      {categories.map(c => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
};

export default Category;
