import { useContext } from 'react';
import {HomeContext} from '../../../../contexts/pfc/HomeContext'

const TabBar = () => {
  const { kind, handleTab } = useContext(HomeContext); 

  return (
    <div className='tabBar'>
      <div className={kind === 'Calories' ? 'tab active' : 'tab'} onClick={handleTab}>
        Calories
      </div>
      <div className='line'>|</div>
      <div className={kind === 'PFC' ? 'tab active' : 'tab'} onClick={handleTab}>
        PFC
      </div>
    </div>
  );
};

export default TabBar;
