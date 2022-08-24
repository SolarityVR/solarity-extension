import React from "react";
import TwitterImg from '../../../../assets/img/social/twitter.png';
import DiscordImg from '../../../../assets/img/social/vector.png';

const SocialList = () => {
  return (
    <div className="p-6 pt-0 flex gap-4">
      {[TwitterImg, DiscordImg].map((social, index) => (
        <div className="w-10 h-10 rounded-lg border border-semiSplitter flex items-center cursor-pointer hover:border-[#29B080] hover:bg-focusbackground" key={index}>
          <img src={social} className="mx-auto w-[17px] h-[14px]" />
        </div>
      ))}
    </div>
  );
}

export default SocialList;