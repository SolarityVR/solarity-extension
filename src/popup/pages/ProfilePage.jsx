import React from "react";
import { TitleItem } from "../components/Items";
import SocialList from '../components/MainPage/SocialList';

import Avatar from '../../assets/img/temp/Avatar_Konstantin1982.png';
import Verified from '../../assets/img/profile/verified.png';
import Logo1 from '../../assets/img/logo1.png';
import BannerDescriptionWallet from "../components/MainPage/BannerDescriptionWallet";
import { Power, Setting } from "../components/Icons";

const ProfilePage = () => {
  return (
    <div className="pb-6">
      <div className="bg-globalBgColor flex sm:flex-row xs:flex-col w-full relative">
        <div className="bg-globalBgColor flex flex-col px-[24px] w-full items-center p-[30px]">
          <div className="relative w-[100px] rounded-[35px] border-[3px] border-globalBgColor">
            <img src={Avatar} layout="responsive" width={136} height={136} alt="user avatar" />
            <div className="absolute
                          custom-2xl:right-[0px] custom-2xl:bottom-[0px] custom-2xl:w-[28px]
                          xl:right-[0px] xl:bottom-[0px] xl:w-[26px]
                          md:right-[0px] md:bottom-[0px] md:w-[24px]
                          sm:right-[0px] sm:bottom-[0px] sm:w-[24px]
                          xs:right-[0px] xs:bottom-[0px] xs:w-[24px]">
              <img src={Verified} layout="responsive" width={28} height={28} alt="verified badge" />
            </div>
          </div>
        </div>
      </div>
      <div className="px-6">
        <TitleItem
          title={"Konstantin1982.sol"}
          button={
            <div className="flex gap-2 items-center">
              <div>
                <img src={Logo1} width={20} height={20} />
              </div>
              <div className="text-white text-xl">{450}</div>
            </div>
          }
        />
      </div>
      <SocialList />
      <BannerDescriptionWallet />
      <div className="px-6 py-3 text-grey text-sm border-b border-b-semiSplitter">
        A button with an eye has been added to make it clear to the user how to enable a preview of the room
      </div>
      <div className="p-6 py-4 cursor-pointer text-white text-xl flex items-center border-b border-b-semiSplitter">
        <Setting />&nbsp; Setting
      </div>
      <div className="p-6 py-4 cursor-pointer text-white text-xl flex items-center border-b border-b-semiSplitter">
        <Power />&nbsp; Sign out
      </div>
    </div>
  );
}

export default ProfilePage;