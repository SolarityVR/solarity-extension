import React from "react";
import { MENU_ITEMS } from "../../data";

const Footer = (props) => {

  const switchMenu = () => {
    alert('change menu');
  }

  return (
    <div className="absolute bottom-0 w-full border-t-[1px] p-[14px] px-5 border-semiSplitter flex justify-between">
      {
        MENU_ITEMS.map((item, index) => (
          <div
            className={"cursor-pointer hover:text-primary " + (item.name == props.activeMenu ? "text-primary" : "text-white")}
            key={index}
            onClick={switchMenu}
          >
            {item.content}
          </div>
        ))
      }
    </div>
  );
}

export default Footer;