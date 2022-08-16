import React from "react";
import { TwoItemTemplate } from "../../Panels";
import Event1 from '../../../../assets/img/library/event1.png';
import { LIVE_EVENT_ONLINE_USERS } from "../../../data";

const LiveEvents = (props) => {

  return (
    <div className="p-6 border border-semiSplitter">
      <div className="text-xl leading-normal font-medium text-white pb-1">
        Recommended quest
      </div>
      <TwoItemTemplate
        image={<img src={Event1} width={72} height={72} className="rounded-md" />}
        title={LIVE_EVENT_ONLINE_USERS[0].title}
        nextIcon={true}
        time="50 min"
        gap="3"
        onlineUsers={LIVE_EVENT_ONLINE_USERS[0].users}
        showUsers={LIVE_EVENT_ONLINE_USERS[0].showUsers}
        button={"Play now"}
      />
    </div>
  );
}

export default LiveEvents;