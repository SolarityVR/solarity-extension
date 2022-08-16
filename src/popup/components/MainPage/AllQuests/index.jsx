import React from "react";
import Quest3Img from '../../../../assets/img/library/quest3.png';
import { TitleItem } from "../../Items";
import { TwoItemTemplate } from "../../Panels";

const AllQuests = () => {
  return (
    <div className="px-6 pt-2 pb-4 border-b border-b-semiSplitter">
      <TitleItem
        title="All quests"
      />
      <div className="grid gap-y-4">
        <TwoItemTemplate
          image={<img src={Quest3Img} width={96} height={78} className="rounded-md" />}
          title="Farm 100 Corns"
          detail="Sow, wait and reap 100 corns "
          gap="3"
          reward="450"
          rewardType="verse"
          button={"Play now"}
        />
      </div>
    </div>
  );
}

export default AllQuests;