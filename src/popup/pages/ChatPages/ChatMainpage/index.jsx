import React from "react";
import { InvitationPanel } from "../../../components/Panels";
import ChatsPanel from "../../../components/Panels/ChatsPanel";

const ChatMainPage = () => {
  return (
    <div className="pt-[15px] px-6">
      <InvitationPanel />
      <ChatsPanel />
    </div>
  );
}

export default ChatMainPage;