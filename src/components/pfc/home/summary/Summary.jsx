import { useContext } from 'react';

import TabBar from './TabBar';
import CaloriesBody from './calories/CaloriesBody';
import PFCBody from './pfc/PFCBody';
import { HomeContext } from '../../../../contexts/pfc/HomeContext';

const Summary = () => {
  const { kind } = useContext(HomeContext);
  return (
    <div className='summary'>
      <TabBar />
      {kind === 'Calories' ? <CaloriesBody /> : <PFCBody />}
    </div>
  );
};

export default Summary;
