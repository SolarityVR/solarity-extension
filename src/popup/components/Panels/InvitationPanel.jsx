import React from "react";
import { TitleItem } from "../Items";
import ItemTemplate from "./ItemTemplate";
import Avatar1 from '../../../assets/img/library/avatars/1.png'

const InvitationPanel = () => {
  return (
    <div>
      <TitleItem title="Invitations" />
      <div className="pb-6">
        <ItemTemplate
          image={<img src={Avatar1} width={52} height={52} />}
          title={"Konstantin1982.sol"}
          detail={"invited you to a flock!"}
          isActive={false}
          gap={3}
        />
      </div>
    </div>
  );
}

export default InvitationPanel;