import React from 'react';

const TabBar = ({ active, handleSwitchTab }) => {
  return (
    <div className='tabBar'>
      <div className={active === 'Calories' ? 'tab active' : 'tab'} onClick={handleSwitchTab}>
        Calories
      </div>
      <div className='line'>|</div>
      <div className={active === 'PFC' ? 'tab active' : 'tab'} onClick={handleSwitchTab}>
        PFC
      </div>
    </div>
  );
};

export default TabBar;
