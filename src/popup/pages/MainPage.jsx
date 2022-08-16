import React from "react";
import RecommendedQuest from '../components/MainPage/RecommendedQuest';
import GameLibrary from '../components/MainPage/GameLibrary';
import LiveEvents from '../components/MainPage/LiveEvents';

const MainPage = (props) => {
  return (
    <div className="pt-[15px] overflow-auto">
      <RecommendedQuest />
      <LiveEvents />
      <GameLibrary />
    </div>
  );
}

export default MainPage;