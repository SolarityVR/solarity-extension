import React from "react";
import AddressImg from "../../../assets/img/address.png";
import GithubImg from '../../../assets/img/social/github.png';
import AddressButton from "../../../components/Buttons/AddressButton";
import DomainInput from "../../../components/Forms/DomainInput";
import { DiscordLink } from "../../../components/Links";
import TwitterLink from "../../../components/Links/TwitterLink";
import WalletButton from "../../../components/Buttons/WalletButton";
import { BackButton, PrimaryButton } from "../../../components/Buttons";
import { SharedInput } from "../../../components/Forms";

const UserInfoPage = () => {
  return (
    <div className=" pr-[0]">
      <div className="relative w-auto my-6 mx-auto">
        {/*content*/}
        <div className="rounded-[30px] shadow-lg relative flex flex-col w-full bg-[#141416] outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between pt-8 pl-[32px] pr-[32px] lg:p-14 lg:pb-0 lg:pr-12 rounded-t">
            <h3 className="text-[28px] lg:text-[30px] text-white font-medium tracking-[0.02em]">
              Creating a passport
            </h3>
            <AddressButton caption={""} icon={AddressImg} onClick={null} />
          </div>
          {/*body*/}
          {/* {discordUsername ? discordUsername : 'dasd'} */}
          <div className="relative p-[32px] lg:p-14 flex-auto">
            <div>
              <DomainInput changeValue={() => {}} isError={false} />
              {
                // error ? <div className="text-[16px] text-rose-600">{error}</div> : null
              }
            </div>
            <div className="mt-6">
              <SharedInput changeValue={() => {}} caption="Input your title" />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3">
              <div className="mt-6 mb-3 xl:mt-6 xl:mb-6 xl:text-left">
                <TwitterLink />
              </div>
              <div className="my-3 xl:my-6 xl:text-center">
                <DiscordLink />
              </div>
              <div className="my-3 xl:my-6 xl:text-right">
                <WalletButton caption="Connect" icon={GithubImg} onClick={null} styles="!w-[100%] xl:!w-[95%]" />
              </div>
            </div>
          </div>
          <div className="w-full px-[32px] py-[20px] lg:px-14 lg:py-8 flex-auto flex items-end">
            <div className="inline-block w-[20%] pr-2">
              <BackButton onClick={() => {}} styles="rounded-[15px]" />
            </div>
            <div className="inline-block w-[80%] pl-2">
              <PrimaryButton caption="Continue" icon="" bordered={false} onClick={() => {}} disabled={false} styles="rounded-[15px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfoPage;