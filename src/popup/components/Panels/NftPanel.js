import React, { useState } from "react";
import { minifyString } from "../../utils";

const NftPanel = (props) => {
  return (
    <div onClick={() => props.onClick()} className={`relative w-full h-[200px] rounded-[20px] border-[1.5px] border-white/10 hover:border-[#29B080] z-10 bg-transparent cursor-pointer max-w-[190px] ${props.selected ? "border-[#29B080]" : ""}`}>
      <div className="absolute top-1 left-1 right-1 rounded-[20px] avatar-panel h-[150px] max-w-[180px]">
        <img
          className="rounded-2xl"
          src={props.image}
          alt={props.name}
        />
      </div>
      <div className="absolute flex items-center h-[25px] top-[15px] left-[15px] m-auto w-auto px-2 bg-[rgba(12,12,14,0.5)] rounded-[15px]">
        <span className="text-[12px] text-[#f3f3f3]">{minifyString(props.collectionName, 10)}</span>
      </div>
      <div className="relative mt-[158px] text-center">
        <span className="text-[14px] text-[#929298]">{minifyString(props.name, 12)}</span>
      </div>
    </div>
  );
};

export default NftPanel;
