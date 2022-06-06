import React, { useState } from 'react';
import Summary from './summary/Summary';
import Today from './today/Today';
import { HomeContext } from '../../../contexts/pfc/HomeContext';

const Home = () => {
  const [kind, setKind] = useState('Calories');
  const handleTab = e => {
    setKind(e.target.innerText);
    console.log(kind);
  };

  return (
    <div className='pfcHome'>
      <HomeContext.Provider value={{ kind, handleTab }}>
        <Summary />
      </HomeContext.Provider>
      <Today />
    </div>
  );
};

export default Home;
