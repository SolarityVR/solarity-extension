import React from "react";
import { WalletButton } from "../Buttons";
import TwitterImg from "../../../assets/img/social/twitter.png";
import { useEffect, useState } from "react";
import { Provider, RootStateOrAny, useDispatch, useSelector } from "react-redux";

const twitterLinkGenerator = (currentUrl) => {
	const baseUrl = "https://twitter.com/i/oauth2/authorize";
	const params = {
		response_type: "code",
		client_id: "MENrR095Mkl6WFdKWGZEV0VLTkg6MTpjaQ",
		redirect_uri: currentUrl,
		scope: "tweet.read users.read offline.access",
		state: "state",
		code_challenge: "challenge",
		code_challenge_method: "plain",
	};
	const urlParams = new URLSearchParams(params);
	return baseUrl + "?" + urlParams.toString();
};

const TwitterLink = () => {
	const twitterConnected = false;
	return (
		<>
			{
				twitterConnected ?
					<button
						className={`font-medium py-[22px] px-[22px] rounded-[14px] text-white/70 w-[316px] h-[56px] text-[18px] sm:text-[22px] text-center tracking-wider border-none outline outline-primary hover:bg-focusbackground hover:outline-1 hover:outline-primary inline-flex items-center justify-center bg-[#1d1e20] justify-between !w-[100%] xl:!w-[95%] outline-1 bg-focusbackground !text-white`}
					>
						<span className="text-[16px] w-[90%] text-left">{"Disconnect"}</span>
						<div className="pt-2 text-right"><img src={TwitterImg} width={28} height={28} /></div>
					</button>
					:
					<a className={`font-medium py-[22px] px-[22px] rounded-[14px] text-white/70 w-[316px] h-[56px] text-[18px] sm:text-[22px] text-center tracking-wider border-none outline outline-primary hover:bg-focusbackground hover:outline-1 hover:outline-primary inline-flex items-center justify-center bg-[#1d1e20] justify-between !w-[100%] xl:!w-[95%]`} href={"#"}>
						<span className="text-[16px] w-[90%] text-left">{"Connect"}</span>
						<div className="pt-2 text-right"><img src={TwitterImg} width={28} height={28} /></div>
					</a>
			}
		</>
	)
}

export default TwitterLink;