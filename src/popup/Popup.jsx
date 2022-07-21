import React, { useState } from 'react';

import LandingPage from './pages/LandingPage';
import UserInfoPage from './pages/auth/UserInfoPage';
import UserPic from './pages/auth/UserPic';

import './Popup.css';

const Popup = () => {
  const [loginStages, setLoginStages] = useState(0);
  return (
    <div className='w-[400px] h-[650px] rounded-lg bg-[#141414]'>
      {loginStages == 0 && <LandingPage setLoginStages={setLoginStages} />}
      {loginStages == 1 && <UserInfoPage setLoginStages={setLoginStages} />}
      {loginStages == 2 && <UserPic setLoginStages={setLoginStages} />}
    </div>
  );
};

export default Popup;
