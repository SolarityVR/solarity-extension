import React from "react"

const WalletBalanceIcon = ({ kind, balance, address, badge, onClick }) => {
  return (
    <div className="flex
                        flow-row items-center
                        bg-[#181818] p-[11px] py-2 content-between rounded-[20px] cursor-pointer" onClick={onClick}>
      <div className="flex flex-row justify-start text-[#929298] font-400 min-w-[24px] text-[14px] items-center">
        <img src={badge} width={24} height={24} alt="wallet icon" />
        <div className="xs:hidden">
          {address}
        </div>
      </div>

      <div className="flex flex-row mt-[0px] ml-[8px]">
        <div className="text-[#f3f3f3] font-500 custom-2xl:text-[20px] xl:text-[20px] lg-[20px] sm:text-[16px] xs:text-[14px]">
          {balance}
        </div>
        <div className="text-[#929298] font-500 custom-2xl:text-[20px] xl:text-[20px] lg-[20px] sm:text-[16px] xs:text-[14px] ml-[5px]">
          {kind}
        </div>
      </div>
    </div>
  )
}

export default WalletBalanceIcon