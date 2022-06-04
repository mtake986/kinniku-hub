import React from 'react'
import Summary from './summary/Summary';
import Today from './today/Today';

const Home = () => {
  return (
    <div className="pfcHome">
      <Summary />
      <Today />
    </div>
  )
}

export default Home