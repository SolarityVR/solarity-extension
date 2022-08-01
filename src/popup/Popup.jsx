import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import LandingPage from './pages/LandingPage';
import UserInfoPage from './pages/auth/UserInfoPage';
import UserPic from './pages/auth/UserPic';

import { setPageStages, connectWallet, login } from './redux/slices/authSlice';

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
        dispatch(connectWallet({ publicKey: message.publicKey, walletType: setValue(localStorage.getItem('walletType')) }));
        break;
      case 'receive-signature':
        dispatch(login({ publicKey: message.publicKey, walletType: message.walletType, signature: message.signature }))
        break;
    }
  }

  useEffect(() => {
    if ((pageStages != 1 || pageStages != 2) && authFlag && !profileData.visible) {
      dispatch(setPageStages(1));
    }

    if ((pageStages == 1 || pageStages == 2) && !authFlag) {
      dispatch(setPageStages(0));
    }
  }, [authFlag, profileData.visible]);

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
