
import { useContext } from 'react';
import { FilterInputsContext } from '../../../../contexts/quiz/FilterInputsContext';

const User = () => {
  const { handleSearchByUid, searchByUid, users } = useContext(FilterInputsContext);
  
  return (
    <select
      name='user'
      onChange={handleSearchByUid}
      className={
        searchByUid !== '' && searchByUid !== '----------'
          ? 'chosen'
          : ''
      }
    >
      <option disabled>
        Select an username
      </option>
      <option defaultValue>
        ----------
      </option>
      {users.map((c, index) => (
        <option key={index} value={c.uid}>
          {c.username}
        </option>
      ))}
    </select>
  );
};

export default User;

