import React from "react";
import ItemTemplate from "../../Panels/ItemTemplate";
import { GAME_LIBRARIES } from "../../../data";

const RecommendedQuest = (props) => {

  return (
    <div className="p-6">
      <div className="text-xl leading-normal font-medium text-white pb-1">
        Game Library
      </div>
      <div className="grid gap-y-3">
        {GAME_LIBRARIES.map((item, index) => (
          <ItemTemplate
            image={<img src={item.image} width={72} height={72} className="rounded-md" />}
            title={item.title}
            gap="6"
            button="Play now"
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default RecommendedQuest;