import React from "react";
import ItemTemplate from "../../Panels/ItemTemplate";
import LibraryMain from '../../../../assets/img/placeholder/library_main.png';

const RecommendedQuest = (props) => {

  return (
    <div className="p-6">
      <div className="text-xl leading-normal font-medium text-white pb-1">
        Game Library
      </div>
      <div className="grid gap-y-3">
        {[0, 1, 2, 3].map((item, index) => (
          <ItemTemplate
            image={<img src={LibraryMain} width={72} height={72} />}
            title="Mini Royale"
            gap="6"
            button="Play now"
          />
        ))}
      </div>
    </div>
  );
}

export default RecommendedQuest;