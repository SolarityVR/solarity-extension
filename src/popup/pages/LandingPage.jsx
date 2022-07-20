import React from "react";
import Logo from "../../assets/img/logo.png";
import { WalletButton } from "../../components/Buttons";
import { WALLETS } from "../data";

const LandingPage = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full relative bg-black/70 pt-10">
        <img src={Logo} className="mx-auto w-24 h-24"/>
        <h2 className="text-primary text-3xl font-bold text-center mt-2">Solarity Extension</h2>
        <div className="absolute flex bottom-0 w-[100%] mx-auto" onClick={(e) => { e.stopPropagation() }}>
          {/*content*/}
          <div className="rounded-t-[30px] rounded-b-lg text-center shadow-lg relative flex flex-col w-full bg-[#141416] outline-none focus:outline-none">
            {/*header*/}
            <div className="pt-12 px-8 w-full">
              <h3 className="text-[20px] text-white font-normal tracking-[0.02em]">
              Getting Started,<br />
              Connect your wallet to continue!
              </h3>

            </div>
            <div className="relative p-8 flex-auto">
              {WALLETS.map(({ label, id, type, image }) => (
                <div className="py-2" key={id}>
                  <WalletButton caption={label} icon={image} onClick={() => {
                    connectWallet(id, type, ({ address, type, provider }) => {
                      onSelect(address, type, provider);
                    });
                  }} styles="!w-[100%]" />
                </div>
              ))}
            </div>
            <div className="pb-12">
              <p className="text-[#929298]">Don’t you have any wallet?</p>
              <a className="text-primary hover:text-focus" href="https://phantom.app/" target="_blank">Create a free wallet!</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;