import React from "react";
import { TitleItem } from "../../Items";
import { TwoItemTemplate } from "../../Panels";
import AuroryImg from '../../../../assets/img/library/aurory.png'
import Quest2Img from '../../../../assets/img/library/quest2.png'

const DailyQuests = () => {
  return (
    <div className="px-6 pb-4 border-b border-b-semiSplitter">
      <TitleItem
        title="Daily quests"
      />
      <div className="grid gap-y-4">
        <TwoItemTemplate
          image={<img src={AuroryImg} width={96} height={78} className="rounded-md" />}
          title="Aurory"
          detail="Damage with Legendary Weapons"
          gap="3"
          reward="450"
          rewardType="verse"
          button={"Play now"}
        />
        <TwoItemTemplate
          image={<img src={Quest2Img} width={96} height={78} className="rounded-md" />}
          title="Collect all pets!"
          detail="Fight and breed your pets with smooth love potions"
          gap="3"
          reward="450"
          rewardType="verse"
          button={"Play now"}
        />
      </div>
    </div>
  );
}

export default DailyQuests;