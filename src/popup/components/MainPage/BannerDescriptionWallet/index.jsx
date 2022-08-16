import React from "react";
import { WalletBalanceData } from "../../../data";
import { LeftArrow, RightArrow, TotalBalanceIcon } from "../../Icons";
import WalletBalanceIcon from "./WalletBalanceIcon";

const BannerDescriptionWallet = () => {
  const rightScroll = () => {
    document.querySelector(".banner-description-wallet").scrollLeft += 80;
  };

  const leftScroll = () => {
    document.querySelector(".banner-description-wallet").scrollLeft -= 80;
  };

  return (
    <div className={`relative w-full px-6 border-[#272829]
    lg:border-[1px] md:border-x-[0px] md:border-y-[1px] sm:border-x-[0px] sm:border-y-[1px] xs:border-x-[0px] xs:border-y-[1px]`}>
      <div className={`banner-description-wallet flex h-30 relative cursor-pointer
                    p-[5px] gap-4
                    lg:rounded-[25px] md:rounded-[0px] sm:rounded-[0px] xs:rounded-[0px]
                    justify-between lg:overflow-y-visible lg:overflow-x-visible
                    md:overflow-y-hidden md:overflow-x-visible sm:overflow-y-hidden sm:overflow-x-visible xs:overflow-y-hidden xs:overflow-x-visible
                    scroll-smooth`}>

        <div className="p-4 py-0 flex flex-col lg:justify-end lg:justify-items-end
                      md:justify-center sm:justify-center xs:justify-center"  onClick={() => (alert("coming soon"))}>
          <div className="flex flex-row">
            <div className="text-[#f3f3f3] font-500
                            custom-2xl:text-[20px] xl:text-[20px] lg:text-[20px] sm:text-[16px] xs:text-[16px]">
              871.18
            </div>
            <div className="text-[#929298] font-500
                            custom-2xl:text-[20px] xl:text-[20x] lg:text-[20px] sm:text-[16px] xs:text-[16px] ml-[10px]">
              USD
            </div>
          </div>
          <div className="custom-2xl:text-[16px] xl:text-3 lg:text-[20px] sm:text-[16px]
                          font-400 text-[#474749]
                          lg:block md:hidden sm:hidden xs:hidden">
            Total balance
          </div>
          <div className="absolute top-[-15px]
                          lg:block md:hidden sm:hidden xs:hidden">
            <TotalBalanceIcon />
          </div>
        </div>

        {WalletBalanceData.map((i, index) => {
          return <WalletBalanceIcon kind={i.kind} balance={i.balance} badge={i.icon_url} address={i.addr} onClick={() => alert("coming soon")} key={index} />
        })}


      </div>
      <div className="absolute right-[3px] text-white top-0 lg:hidden md:block">
        <button onClick={rightScroll} className="bg-gradient-to-l from-[rgba(19,19,20,1)] via-[rgba(19,19,20,0.8)] to-[rgba(19,19,20,0)] pl-[35px] xs:h-[63px] sm:h-[52px]"><RightArrow /></button>
      </div>

      <div className="absolute left-[3px] text-white top-0 lg:hidden md:block">
        <button onClick={leftScroll} className="bg-gradient-to-r from-[rgba(19,19,20,1)] via-[rgba(19,19,20,0.8)] to-[rgba(19,19,20,0)] pr-[35px] xs:h-[63px] sm:h-[52px]"><LeftArrow /></button>
      </div>
    </div>
  )
}

export default BannerDescriptionWallet;