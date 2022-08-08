import React from "react";

const ItemTemplate = (props) => {
  return (
    <div className="p-[14px] text-lightGrey">
      <div className="flex">
        <div>
          {props.image}
        </div>
        <div>
          <div className="text-base font-bold leading-tight mb-[10px]">
            Collect all pets!
          </div>
          <div className="text-sm font-normal leading-tight items-center">
            Damage with Legendary Weapons
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemTemplate;