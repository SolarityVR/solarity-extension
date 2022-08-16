import React from "react";
const AvatarItem = (props) => {
  return (
    <div className="relative cursor-pointer" >
      <div className="w-13 h-13 rounded-2xl">
        <img src={props.img} alt="Avatar" />
      </div>
      {props.isActive && (
        <div
          className=" absolute top-0 right-0 w-[10px] h-[10px] bg-secondaryColor rounded-full shadow"
        ></div>
      )}
    </div>
  );
}

export default AvatarItem;