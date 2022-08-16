import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import { LeftArrow } from "../Icons";

const LeftArrowButton = (props) => {
  return (
    <button className="text-primary flex flex-row items-center gap-[20px]" onClick={props.onClick}>
      <LeftArrow />
      <span className="text-white font-medium text-[24px] hover:text-primary">{props.caption}</span>
    </button>
  );
};

export default LeftArrowButton;
