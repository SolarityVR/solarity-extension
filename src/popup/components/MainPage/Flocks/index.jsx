import React from "react";
import { FLOCKS } from "../../../data";
import PrimaryBorderButton from "../../Buttons/PrimaryBorderButton";
import { TitleItem } from "../../Items";
import ItemTemplate from "../../Panels/ItemTemplate";

const Flocks = () => {
  return (
    <div className="px-6 pt-5 pb-6">
      <TitleItem title="Flocks" comment="11" />
      <div className="grid gap-y-3">
        {FLOCKS.map((flock, index) => (
          <ItemTemplate
            title={flock.title}
            detail={flock.detail}
            time={flock.time}
            image={<img
              src={flock.img}
              width={52}
              height={52} />
            }
            gap={3}
            key={index}
          />
        ))}
      </div>
      <div className="py-6 flex justify-center">
        <PrimaryBorderButton caption="See active flocks" styles="py-1" />
      </div>
    </div>
  );
}

export default Flocks;