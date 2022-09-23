import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import 'jest-extended';

import LandingPage from './pages/LandingPage';
import UserInfoPage from './pages/auth/UserInfoPage';
import UserPic from './pages/auth/UserPic';
import MainPage from './pages/MainPage';

import Layout from './components/Layout';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

import { setPageStages, login, userExist, checkSession } from './redux/slices/authSlice';

import './Popup.css';
import FriendPage from './pages/FriendPage';
import FriendDetailPage from './pages/FriendDetailPage';
import ChatMainPage from './pages/ChatPages/ChatMainPage';
import ChatPanelPage from './pages/ChatPages/ChatPanelPage';
import QuestPage from './pages/QuestPage';
import ProfilePage from './pages/ProfilePage';
import MessagePage from './pages/MessagePage';
import InviteFriendPage from './pages/InviteFriendPage';
import AppLoader from './pages/AppLoader';
import { eqArraySets, setValue, time_ago } from './utils';

import socket from './utils/socket-client';
import { setFriends, setOnline, setTypingState, setUserMsg } from './redux/slices/chatSlice';
import ACTIONS from '../config/action';

const Popup = () => {
  const [loginStages, setLoginStages] = useState(0);
  const [solanaAddress, setSolanaAddress] = useState("");
  const menuData = [0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 2];

  const { pageStages, authFlag, profileData, friends, members, typingMembers } = useSelector((state) => ({
    profileData: state.auth.profile,
    pageStages: state.auth.pageStages,
    authFlag: state.auth.authFlag,
    friends: state.chat.friends,
    members: state.chat.members,
    typingMembers: state.chat.typingMembers,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    window.members = members;
    window.typingMembers = typingMembers;
  }, [members, typingMembers])

  useEffect(() => {
    chrome.runtime.onMessage.addListener(onExtMessage);
    const init_socket = () => {
      window.initFlag = true;

      window.socket.on(ACTIONS.USER_INFO_EXTENSION, (friends) => {
        dispatch(setFriends(friends));
      })

      window.socket.on(ACTIONS.ADD_USER_EXTENSION, (data) => {
        dispatch(setOnline(data));
      })

      window.socket.on(ACTIONS.TYPING_STATE, (data) => {
        if (eqArraySets(window.members, data.members)) {
          dispatch(setTypingState({ state: data.state, name: data.name, typingMembers: window.typingMembers }));
        }
      })

      window.socket.on(ACTIONS.SEND_MSG_EXTENSION, (msg) => {
        if (!!msg) {
          if (!msg.groupType) {
            dispatch(setUserMsg(msg));
          }
          if (msg.members[0] != localStorage.getItem('name')) {
            // toast.success(msg.content, {
            //   position: "top-right",
            //   autoClose: 5000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            // });
          }
        }
      });
    }
    if (!window.socket) {
      window.socket = socket();
    }
    if (!window.initFlag && window.socket) {
      init_socket();
    }

    // Get profile data from server
    dispatch(checkSession());
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
    <div className='w-[375px] h-[600px] bg-[#141414] relative'>
      <AppLoader />
      {/* login and register */}
      {authFlag == false && (
        <div className='w-full h-full'>
          {pageStages == 0 && <LandingPage />}
          {pageStages == 1 && <UserInfoPage />}
          {pageStages == 2 && <UserPic />}
        </div>
      )}
      {/* Main Layout */}
      {authFlag == true && (
        <Layout header={<Header />} footer={<Footer activeMenu={menuData[pageStages]} />} pageStages={pageStages}>
          {pageStages == 3 && <MainPage />}
          {pageStages == 4 && <FriendPage />}
          {pageStages == 5 && <ChatMainPage />}
          {pageStages == 6 && <QuestPage />}
          {pageStages == 7 && <ProfilePage />}
          {pageStages == 8 && <FriendDetailPage />}
          {pageStages == 9 && <ChatPanelPage />}
          {pageStages == 10 && <MessagePage />}
          {pageStages == 11 && <InviteFriendPage />}
        </Layout >
      )}
    </div >
  );
};

export default Popup;
