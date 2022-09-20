import React from "react";
import { minifyString } from "../../../../../popup/utils";
import { TimerIcon } from "../../../Icons";

const LiveQuestPanel = (props) => {
  const { data, onClick } = props;

  return (
    <div className="flex flex-col relative overflow-hidden cursor-pointer
                        w-full rounded-[10px] border-[1.2px] border-[#272829] hover:border-[#29B080] transition duration-300 bg-[#242424]" onClick={props.onClick}>
      <div className="w-full relative">
        <img src={data.image} width="100%" />
        <div className="absolute bottom-[10px] left-[10px] flex flex-row gap-[7px] z-10">
          <div className="h-[20px] w-[20px] rounded-full overflow-hidden"><img src={data.creator.avatar} width={32} height={32} /></div>
          <span className="font-medium text-[12px] text-white pt-2">{data.creator.name}</span>
        </div>
        <div className="absolute bottom-0 left-0 h-[45px] w-full bg-gradient-to-b from-transparent via-[#04110cc5] via-3/5 to-[#04110C]"></div>
      </div>
      <div className="pb-[10px] pt-[5px] px-[10px] h-full flex flex-col justify-between">
        <span className="text-[17px] text-[#F3F3F3] leading-[24px]">
          {data.title}
          <span className="text-[15px] text-[#929298] leading-[24px]">{minifyString(data.description, 25)}</span>
        </span>

        <div className="flex items-center justify-between text-[#29B080] text-[14px] mt-[20px]">
          <div className="flex flex-row items-center">
            <img src={data.walletType} width="22" height="22" className="p-[3px]" />
            <span className="text-[#F3F3F3] text-[22px]">{data.hourly}</span>
            <span className="text-[#929298] text-[16px]">/hr</span>
          </div>
          <div className="flex flex-row items-center">
            <button className="text-[14px] text-white bg-[#29B080] py-2 px-4 rounded-xl cursor-pointer">Play</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveQuestPanel