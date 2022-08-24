import React, { useState } from "react";

const AvatarPanel = (props) => {
  return (
    <div
      className={`relative w-full rounded-[20px] border-[1.5px] border-white/10 hover:border-[#29B080] z-10 bg-transparent cursor-pointer max-w-[190px] ${props.selected ? "border-[#29B080]" : ""}`}
      onClick={() => props.onClick()}
    >
      <div className="avatar-panel max-w-[180px] p-1">
        <img
          className="rounded-[20px]"
          src={props.imageUrl}
          alt={"avatars"}
        />
      </div>
      <div className="relative text-center">
        <span className="text-[14px] text-[#929298]">{"Avatar"}</span>
      </div>
    </div>
  );
};

export default AvatarPanel;
