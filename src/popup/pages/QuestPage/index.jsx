import React from "react";
import DailyQuests from "../../components/MainPage/DailyQuests";
import AllQuests from "../../components/MainPage/AllQuests";
// import LiveEvents from '../components/MainPage/LiveEvents';
import { Schedule } from "../../components/Icons";

const MainPage = (props) => {
  return (
    <div className="overflow-auto pb-6">
      <div className="pb-4 pt-1 text-white flex text-base items-center justify-center px-6">
        <Schedule size={16} />&nbsp; 6d 17hrs &nbsp;&nbsp;&nbsp; 0&nbsp;/&nbsp;<span className="text-primary">15,000</span>
      </div>
      <DailyQuests />
      <AllQuests />
      {/* <GameLibrary /> */}
    </div>
  );
}

export default MainPage;