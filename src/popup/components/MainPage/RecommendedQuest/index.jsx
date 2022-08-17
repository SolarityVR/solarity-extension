import React from "react";
import { TwoItemTemplate } from "../../Panels";
import AuroryImg from '../../../../assets/img/library/aurory.png';

const RecommendedQuest = (props) => {

  return (
    <div className="pb-6 px-6 border border-semiSplitter">
      <div className="text-xl leading-normal font-medium text-white pb-1">
        Recommended quest
      </div>
      <TwoItemTemplate
        image={<img src={AuroryImg} width={96} height={78} className="rounded-md" />}
        title="Collect all pets!"
        // nextIcon={true}
        detail="Damage with Legendary Weapons"
        gap="3"
        reward="450"
        rewardType="verse"
        button={"Play now"}
      />
    </div>
  );
}

export default RecommendedQuest;