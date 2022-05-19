import React from 'react'

const SearchByCategory = ({handleSearchByCategory, searchByCategory, categories}) => {
  return (
    <select
      name='category'
      onChange={handleSearchByCategory}
      className={
        searchByCategory !== '' 
          ? 'categorySearch notDefaultValue'
          : 'categorySearch'
      }
    >
      <option selected disabled>Select a Category</option>
      <option value='all' >All</option>
      {categories.map(c => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  )
}

export default SearchByCategory