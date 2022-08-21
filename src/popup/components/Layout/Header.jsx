import React from "react";
import LogoImg from "../../../assets/img/logo.png";
import AlarmImg from "../../../assets/img/icons/alarm.png";

const Header = (props) => {
  const openPopupModal = (event, title) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        command: 'open-popup-modal-action'
      });
    });
  }

  return (
    <div className="p-5 flex justify-between border-b-[1px] border-semiSplitter">
      <div className="w-10 h-10 text-white cursor-pointer" onClick={openPopupModal}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
      <img src={LogoImg} alt="logo" className="w-10 h-10 bg-darkGreen p-[3px] border rounded-full border-white" />
      <img src={AlarmImg} alt="alarm" className="w-6 h-6 m-2 cursor-pointer" />
    </div>
  );
}

export default Header;