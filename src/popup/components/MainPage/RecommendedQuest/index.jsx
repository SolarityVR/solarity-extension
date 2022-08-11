import React from "react";
import ItemTemplate from "../../Panels/ItemTemplate";
import QuestMainimg from '../../../../assets/img/placeholder/quest_main.png';

const RecommendedQuest = (props) => {

  return (
    <div className="mb-6">
      <div className="text-xl leading-normal font-medium text-white pb-1">
        Recommended quest
      </div>
      <ItemTemplate
        image={<img src={QuestMainimg} width={118} height={114} />}
        title="Collect all pets!"
        detail="Damage with Legendary Weapons"
        gap="3"
      />
    </div>
  );
}

export default RecommendedQuest;