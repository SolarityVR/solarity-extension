import React from "react";
import TwitterImg from '../../../../assets/img/social/twitter.png';
import DiscordImg from '../../../../assets/img/social/discord.png';

const SocialPanel = () => {
  return (
    <div className="flex gap-3 border border-transparent rounded-2xl p-[14px] hover:border-[#29B080] bg-lightDark">
      <div className="flex gap-3">
        {[TwitterImg, DiscordImg].map((social, index) => (
          <div className="!w-10 h-10 rounded-lg border border-semiSplitter flex items-center cursor-pointer hover:border-[#29B080] hover:bg-focusbackground" key={index}>
            <img src={social} className="mx-auto w-[17px] h-[14px]" />
          </div>
        ))}
      </div>
      <div className="text-grey text-sm">
        Find and connect with friends from your social network
      </div>
    </div>
  )
}

export default SocialPanel;