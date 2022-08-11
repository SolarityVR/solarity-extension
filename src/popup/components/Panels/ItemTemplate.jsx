import React from "react";
import PrimaryBorderButton from "../Buttons/PrimaryBorderButton";
import { Play } from "../Icons";

const ItemTemplate = (props) => {
  return (
    <div className="p-[14px] text-lightGrey bg-lightDark rounded-[15px]">
      <div className="flex">
        {props.image}
        <div className={`pl-${props.gap} relative w-full`}>
          {props.title && (
            <div className="text-base font-bold leading-tight mb-2">
              {props.title}
            </div>
          )}
          {props.detail && (
            <div className="text-sm font-normal leading-tight items-center mb-2">
              {props.detail}
            </div>
          )}
          <PrimaryBorderButton
            icon={<Play />}
            caption="Play now"
          />
          {props.time && (
            <div className="absolute top-0 right-0 text-grey text-sm">
              {props.time}
            </div>
          )}
          {props.badge && (
            <div className="absolute right-0 h-[20px] top-[35%] text-xs rounded-full text-center pt-[2px] px-[6px] justify-items-center text-primary bg-[#162724] border-primary border">{props.badge}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemTemplate;