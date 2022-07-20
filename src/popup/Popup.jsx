import React, { useState } from 'react';

import LandingPage from './pages/LandingPage';
import UserInfoPage from './pages/UserInfoPage';

import './Popup.css';

const Popup = () => {
  const [loginStages, setLoginStages] = useState(1);
  return (
    <div className='w-[375px] h-[650px] rounded-lg bg-[#141414]'>
      {loginStages == 0 && <LandingPage />}
      {loginStages == 1 && <UserInfoPage />}
    </div>
  );
};

export default Popup;
