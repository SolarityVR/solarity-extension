import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

// import LandingPage from './pages/LandingPage';
// import UserInfoPage from './pages/auth/UserInfoPage';
// import UserPic from './pages/auth/UserPic';
import MainPage from './pages/MainPage.jsx';

import Layout from './components/Layout';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// import { setPageStages, login, userExist } from './redux/slices/authSlice';

import './Popup.css';
import FriendPage from './pages/FriendPage';
import ChatMainPage from './pages/ChatPages/ChatMainPage';
import QuestPage from './pages/QuestPage';
import ProfilePage from './pages/ProfilePage';
// import { setValue } from './utils';

const Popup = () => {
  const [loginStages, setLoginStages] = useState(0);
  const [solanaAddress, setSolanaAddress] = useState("");
  const [pageStages, setPageStages] = useState(6);

  // const { pageStages, authFlag, profileData } = useSelector((state) => ({
  //   profileData: state.auth.profile,
  //   pageStages: state.auth.pageStages,
  //   authFlag: state.auth.authFlag,
  // }));
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   chrome.runtime.onMessage.addListener(onExtMessage);
  // }, [])

  // const onExtMessage = (message, sender, sendResponse) => {
  //   switch (message.command) {
  //     case 'wallet-connected':
  //       dispatch(userExist({ publicKey: message.publicKey, walletType: setValue(localStorage.getItem('walletType')) }));
  //       break;
  //     case 'receive-signature':
  //       dispatch(login({ publicKey: message.publicKey, walletType: message.walletType, signature: message.signature }))
  //       break;
  //   }
  // }

  return (
    <div className='w-[375px] h-[650px] bg-[#141414] relative'>
      {/* login and register */}
      {/* {pageStages == 0 && <LandingPage />}
      {pageStages == 1 && <UserInfoPage />}
      {pageStages == 2 && <UserPic />} */}
      {/* Main Layout */}
      <Layout header={<Header />} footer={<Footer activeMenu={'home'} />}>
        {pageStages == 3 && <MainPage />}
        {pageStages == 4 && <FriendPage />}
        {pageStages == 5 && <ChatMainPage />}
        {pageStages == 6 && <QuestPage />}
        {pageStages == 7 && <ProfilePage />}
      </Layout>
    </div>
  );
};

export default Popup;
