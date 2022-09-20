import React, { useState } from "react";
import { LeftArrow, RightArrow } from '../../Icons';
import { GameLibraryData, LibraryMenu, EventsMenu, LiveEventsData, QuestsMenu, LiveQuestsData } from "../../../data";
import GamePanel from "./Panels/GamePanel";
import LiveEventPanel from "./Panels/LiveEventPanel";
import EventMorePanel from "./Panels/EventMorePanel";
import LiveQuestPanel from "./Panels/LiveQuestPanel";

const Library = (props) => {
  const { setPage, selectGame, setIframe } = props

  const [eventTabIndex, setEventTabIndex] = useState(0);
  const [questTabIndex, setQuestTabIndex] = useState(0);
  const [gameTabIndex, setGameTabIndex] = useState(0);
  const [active, setActive] = useState("Up and Coming");
  const [activeEventsMenu, setActiveEventsMenu] = useState("Your DAOs");
  const [activeQuestsMenu, setActiveQuestsMenu] = useState("Highest Yields");

  const rightScroll = () => {
    document.querySelector(".library-tab").scrollLeft += 80;
  };

  const leftScroll = () => {
    document.querySelector(".library-tab").scrollLeft -= 80;
  };

  const onClickGameItem = (data) => {
    setPage(1);
    selectGame(data);
  }

  const onClickEventMenu = (index, item) => {
    setActiveEventsMenu(item);
    setEventTabIndex(index)
  }

  const onClickQuestMenu = (index, item) => {
    setActiveQuestsMenu(item);
    setQuestTabIndex(index)
  }

  return (
    <div className="flex flex-col w-full px-[30px]">
      <div className="grid grid-cols-5 gap-10">
        <div className="col-span-2">
          <div className="my-[10px] text-[#F3F3F3] font-500 md:text-[24px] xs:text-[18px]">
            Top Quests
          </div>
          <div className={`relative w-fit`}>
            <div className="library-tab flex flex-row h-full lg:justify-between md:justify-around sm:justify-between xs:justify-between">
              {QuestsMenu.map((item, index) => (
                <div
                  className={`flex flex-col 
                            custom-2xl:mr-10 mr-[20px] xl:mr-[28px] font-500 text-[16px] px-[18px] py-[6px] justify-center items-center ${activeQuestsMenu == item ? "text-[#29B080]" : "text-[#929298]"
                    } h-full cursor-pointer hover:text-[#29B080] select-none ${index === 0 ? "pl-0" : ""
                    }`}
                  onClick={() => onClickQuestMenu(index, item)}
                  key={index}
                >
                  <nobr>{item}</nobr>
                </div>
              ))}
            </div>
          </div>
          <div className="gap-[32px] grid custom-2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 justify-items-center my-[16px]">
            {questTabIndex === 0 ? LiveQuestsData.map((item, index) => (
              <LiveQuestPanel data={item} key={index} onClick={() => onClickGameItem(item)} />
            )) : null}
            {questTabIndex === 1 ? LiveQuestsData.map((item, index) => (
              <LiveQuestPanel data={item} key={index} onClick={() => onClickGameItem(item)} />
            )) : null}
            {questTabIndex === 2 ? LiveQuestsData.map((item, index) => (
              <LiveQuestPanel data={item} key={index} onClick={() => onClickGameItem(item)} />
            )) : null}
          </div>
        </div>
        <div className="col-span-3">
          <div className="my-[10px] text-[#F3F3F3] font-500 md:text-[24px] xs:text-[18px]">
            Live Now
          </div>
          <div className={`relative w-fit`}>
            <div className="library-tab flex flex-row h-full lg:justify-between md:justify-around sm:justify-between xs:justify-between">
              {EventsMenu.map((item, index) => (
                <div
                  className={`flex flex-col 
                            custom-2xl:mr-10 mr-[20px] xl:mr-[28px] font-500 text-[16px] px-[18px] py-[6px] justify-center items-center ${activeEventsMenu == item ? "text-[#29B080]" : "text-[#929298]"
                    } h-full cursor-pointer hover:text-[#29B080] select-none ${index === 0 ? "pl-0" : ""
                    }`}
                  onClick={() => onClickEventMenu(index, item)}
                  key={index}
                >
                  <nobr>{item}</nobr>
                </div>
              ))}
            </div>
          </div>
          <div className="gap-[32px] grid custom-2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 justify-items-center my-[16px]">
            {eventTabIndex === 0 ? LiveEventsData.map((item, index) => (
              <LiveEventPanel data={item} key={index} onClick={() => onClickGameItem(item)} />
            )) : null}
            {eventTabIndex === 1 ? LiveEventsData.map((item, index) => (
              <LiveEventPanel data={item} key={index} onClick={() => onClickGameItem(item)} />
            )) : null}
            {eventTabIndex === 2 ? LiveEventsData.map((item, index) => (
              <LiveEventPanel data={item} key={index} onClick={() => onClickGameItem(item)} />
            )) : null}
            {eventTabIndex === 3 ? LiveEventsData.map((item, index) => (
              <LiveEventPanel data={item} key={index} onClick={() => onClickGameItem(item)} />
            )) : null}
            <EventMorePanel />
          </div>
        </div>
      </div>
      <div className="my-[10px] text-[#F3F3F3] font-500 md:text-[24px] xs:text-[18px]">
        Explore Library
      </div>
      <div className={`relative w-fit`}>
        <div
          className="library-tab flex flex-row h-full
                            lg:justify-between md:justify-around sm:justify-between xs:justify-between"
        >
          {LibraryMenu.map((item, index) => (
            <div
              className={`flex flex-col 
                        custom-2xl:mr-10 mr-[20px] xl:mr-[28px] font-500 text-[16px] px-[18px] py-[12px] justify-center items-center ${active == item ? "text-[#29B080]" : "text-[#929298]"
                } h-full cursor-pointer hover:text-[#29B080] select-none ${index === 0 ? 'pl-0' : ''}`}
              onClick={() => setActive(item)}
              key={index}
            >
              <nobr>{item}</nobr>
            </div>
          ))}
        </div>

        <div className="absolute right-[-3px] text-white top-[0px] sm:hidden xs:block">
          <button
            onClick={rightScroll}
            className="bg-gradient-to-l from-[rgba(19,19,20,1)] via-[rgba(19,19,20,0.8)] to-[rgba(19,19,20,0)] pl-[35px] h-[48px]"
          >
            <RightArrow />
          </button>
        </div>

        <div className="absolute left-[-3px] text-white top-[0px] sm:hidden xs:block">
          <button
            onClick={leftScroll}
            className="bg-gradient-to-r from-[rgba(19,19,20,1)] via-[rgba(19,19,20,0.8)] to-[rgba(19,19,20,0)] pr-[35px] h-[48px]"
          >
            <LeftArrow />
          </button>
        </div>
      </div>
      <div className="gap-[32px] grid custom-2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 justify-items-center my-[32px]">
        {
          GameLibraryData.map((item, index) => (
            <GamePanel image={item.image} key={index} title={item.title} likes={item.likes} members={item.members} onClick={() => onClickGameItem(item)} />
          ))
        }
      </div>
    </div>
  );
};

export default Library;
