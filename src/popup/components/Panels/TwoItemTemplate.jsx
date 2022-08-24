import React from "react";
import PrimaryBorderButton from "../Buttons/PrimaryBorderButton";
import { ArrowBack, Play, Schedule } from "../Icons";
import Logo1 from '../../../assets/img/logo1.png';

const TwoItemTemplate = (props) => {
  return (
    <div className="grid gap-y-2">
      <div className={`p-[14px] text-lightGrey bg-lightDark rounded-[15px] border hover:border-[#29B080] ` + (props.isActive ? "border-[#29B080]" : "border-transparent")}>
        <div className="flex">
          {props.image}
          <div className={`pl-${props.gap} relative w-full`}>
            {props.title && (
              <div className="text-[#F3F3F3] text-base font-bold leading-tight mb-2">
                {props.title}
              </div>
            )}
            {props.detail && (
              <div className="text-[#B3B3B7] text-sm font-normal leading-tight items-center mb-2">
                {props.detail}
              </div>
            )}
            {props.time && (
              <div className="flex text-primary text-sm items-center gap-1">
                <span><Schedule size={12} /></span>{props.time}
              </div>
            )}
            {props.nextIcon && (
              <div className="absolute -right-6 h-[20px] top-[65%] text-primary cursor-pointer"><ArrowBack /></div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between bg-lightDark rounded-[15px] px-[14px] py-2">
        {props.button && (
          <PrimaryBorderButton
            icon={<Play />}
            caption={props.button}
          />
        )}
        {props.rewardType && (
          <div className="flex gap-2 items-center">
            <div>
              <img src={Logo1} width={20} height={20} />
            </div>
            <div className="text-white text-xl">{props.reward}</div>
          </div>
        )}
        {props.onlineUsers && (
          <div className="flex">
            {props.onlineUsers.map((user, index) => {
              if (index < props.showUsers) {
                return (
                  <div className="w-[31px] h-[31px] -ml-[15px] rounded-md">
                    <img src={user.img} key={index} width={31} height={29} />
                  </div>
                );
              }
            })}
            {props.onlineUsers && props.onlineUsers.length > props.showUsers && (
              <div className="w-[34px] h-[32px] -ml-[15px] pt-1.5 rounded-md text-white text-sm bg-[#1F1F20] text-center items-center">
                {props.onlineUsers.length - props.showUsers + "+"}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TwoItemTemplate;