import React from "react";
import RecommendedQuest from '../components/MainPage/RecommendedQuest';
import GameLibrary from '../components/MainPage/GameLibrary';

const MainPage = (props) => {
  return (
    <div className="h-[515px] overflow-auto p-6">
      <RecommendedQuest />
      <GameLibrary />
    </div>
  );
}

export default MainPage;