import React from "react";
import DiscordImg from "../../../assets/img/social/discord.png";

export const DiscordLink = (currentUrl) => {
	const discordConnected = false;
	return (
		<>
			{
				discordConnected ?
					<button
						className={`font-medium py-[22px] px-[22px] rounded-[14px] text-white/70 w-[316px] h-[56px] text-[18px] sm:text-[22px] text-center tracking-wider border-none outline outline-primary hover:bg-focusbackground hover:outline-1 hover:outline-primary inline-flex items-center justify-center bg-[#1d1e20] justify-between !w-[100%] xl:!w-[95%] outline-1 bg-focusbackground !text-white`}
					>
						<span className="text-[16px] w-[90%] text-left">{"Disconnect"}</span>
						<div className="pt-2 text-right"><img src={DiscordImg} width={28} height={28} /></div>
					</button>
					:
					<a className={`font-medium py-[22px] px-[22px] rounded-[14px] text-white/70 w-[316px] h-[56px] text-[18px] sm:text-[22px] text-center tracking-wider border-none outline outline-primary hover:bg-focusbackground hover:outline-1 hover:outline-primary inline-flex items-center justify-center bg-[#1d1e20] justify-between !w-[100%] xl:!w-[95%]`} href={"#"}>
						<span className="text-[16px] w-[90%] text-left">{"Connect"}</span>
						<div className="pt-2 text-right"><img src={DiscordImg} width={28} height={28} /></div>
					</a>
			}
		</>
	)
}