import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import LandingPage from './pages/LandingPage';
import UserInfoPage from './pages/auth/UserInfoPage';
import UserPic from './pages/auth/UserPic';

import { setPageStages, login, userExist } from './redux/slices/authSlice';

import './Popup.css';
import { setValue } from './utils';

const Popup = () => {
  const [loginStages, setLoginStages] = useState(0);
  const [solanaAddress, setSolanaAddress] = useState("");

  const { pageStages, authFlag, profileData } = useSelector((state) => ({
    profileData: state.auth.profile,
    pageStages: state.auth.pageStages,
    authFlag: state.auth.authFlag,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    chrome.runtime.onMessage.addListener(onExtMessage);
  }, [])

  const onExtMessage = (message, sender, sendResponse) => {
    switch (message.command) {
      case 'wallet-connected':
        dispatch(userExist({ publicKey: message.publicKey, walletType: setValue(localStorage.getItem('walletType')) }));
        break;
      case 'receive-signature':
        dispatch(login({ publicKey: message.publicKey, walletType: message.walletType, signature: message.signature }))
        break;
    }
  }

  return (
    <div className='w-[400px] h-[650px] rounded-lg bg-[#141414]'>
      {/* login and register */}
      {pageStages == 0 && <LandingPage />}
      {pageStages == 1 && <UserInfoPage />}
      {pageStages == 2 && <UserPic />}
      {/*  */}
    </div>
  );
};

export default Popup;
