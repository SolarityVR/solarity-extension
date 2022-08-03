import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import AddressImg from "../../../assets/img/address.png";
import GithubImg from '../../../assets/img/social/github.png';
import AddressButton from "../../components/Buttons/AddressButton";
import DomainInput from "../../components/Forms/DomainInput";
import { DiscordLink } from "../../components/Links";
import TwitterLink from "../../components/Links/TwitterLink";
import WalletButton from "../../components/Buttons/WalletButton";
import { BackButton, PrimaryButton } from "../../components/Buttons";
import { SharedInput } from "../../components/Forms";

import { minifyAddress } from "../../utils";
import { apiCaller, getErrorMessage } from "../../utils/fetcher";
import { setBioState, setDomainState, setPageStages } from "../../redux/slices/authSlice";

const UserInfoPage = () => {
  const [domain, setDomain] = useState(undefined);
  const [bio, setBio] = useState(undefined);
  const [domainError, setDomainError] = useState('');
  const [bioError, setBioError] = useState('');

  const dispatch = useDispatch();

  const { publicKey, domainState, bioState } = useSelector((state) => ({
    publicKey: state.auth.publicKey,
    domainState: state.auth.registration.domain,
    bioState: state.auth.registration.bio,
  }));

  // Get if current domain is in DB
  const checkDomainAvailability = (formattedDomain) => {
    apiCaller
      .get(`auth/domainAvailability/${formattedDomain}`)
      .then((response) => {
        if (response.data.available) {
          dispatch(setDomainState(domain))
          setDomainError("")
        } else {
          setDomainError(response.data.reason)
        }
      })
      .catch((err) => {
        const message = getErrorMessage(err)
        setDomainError(message)
      });
  }

  // Validate Domain Input
  useEffect(() => {
    // Domain
    if (domain == "") {
      setDomainError("Please input your domain name.")
    } else if (domain != undefined) {
      let formatted = domain.toLowerCase()
      formatted = formatted.replace(" ", "")
      formatted = formatted.substr(0, formatted.lastIndexOf("."))
      checkDomainAvailability(formatted)
    }
  }, [domain])

  useEffect(() => {
    dispatch(setBioState(bio));
  }, [bio]);

  const handleUserInfo = () => {
    if (!domain || !!domainError) {
      alert('Fill out your domain please.');
    } else {
      dispatch(setPageStages(2));
    }
  }

  const cancelUserInfo = () => {
    dispatch(setBioState(""));
    dispatch(setDomainState(""));
    dispatch(setPageStages(0));
  }

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
            <AddressButton caption={minifyAddress(publicKey, 3)} icon={AddressImg} onClick={null} />
          </div>
          {/*body*/}
          <div className="relative p-[32px] lg:p-14 flex-auto">
            <div>
              <DomainInput changeValue={setDomain} domain={domainState} isError={domainError ? true : false} />
              {
                domainError ? <div className="text-[16px] text-rose-600 ">{domainError}</div> : null
              }
            </div>
            <div className="mt-6">
              <SharedInput changeValue={setBio} bio={bioState} caption="Input your bio (optional)" />
              {
                bioError != '' ? <div className="text-[16px] text-rose-600">{bioError}</div> : null
              }
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3">
              <div className="mt-6 mb-3 xl:mt-6 xl:mb-6 xl:text-left">
                <TwitterLink disabled={false} />
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
              <BackButton onClick={cancelUserInfo} styles="rounded-[15px]" />
            </div>
            <div className="inline-block w-[80%] pl-2">
              <PrimaryButton caption="Continue" icon="" bordered={false} onClick={handleUserInfo} disabled={false} styles="rounded-[15px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfoPage;