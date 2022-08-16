import React from "react";
import LogoImg from "../../../assets/img/logo.png";
import AlarmImg from "../../../assets/img/icons/alarm.png";


const Header = (props) => {
  return (
    <div className="p-5 flex justify-between border-b-[1px] border-semiSplitter">
      <div className="w-10 h-10"></div>
      <img src={LogoImg} alt="logo" className="w-10 h-10 border rounded-full border-white" />
      <img src={AlarmImg} alt="alarm" className="w-6 h-6 m-2" />
    </div>
  );
}

export default Header;