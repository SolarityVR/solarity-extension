import React from "react";
import ItemTemplate from "../../Panels/ItemTemplate";

const RecommendedQuest = (props) => {

  return (
    <div>
      <div className="text-xl leading-normal font-medium text-white">
        Recommended quest
      </div>
      <ItemTemplate
        image={<></>}
      />
    </div>
  );
}

export default RecommendedQuest;