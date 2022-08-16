import React from "react";
import { EventItemTemplate } from "../../Panels";
import { LIVE_EVENT_ONLINE_USERS } from "../../../data";

const LiveEvents = (props) => {

  return (
    <div className="p-6 border border-semiSplitter">
      <div className="text-xl leading-normal font-medium text-white pb-1">
        Live Events
      </div>
      <EventItemTemplate
        image={<img src={LIVE_EVENT_ONLINE_USERS[0].img} width={95} height={78} className="rounded-md" />}
        title={LIVE_EVENT_ONLINE_USERS[0].title}
        creator={LIVE_EVENT_ONLINE_USERS[0].creator}
        nextIcon={true}
        time="50 min"
        gap="3"
        onlineUsers={LIVE_EVENT_ONLINE_USERS[0].users}
        showUsers={LIVE_EVENT_ONLINE_USERS[0].showUsers}
        button={"Join"}
      />
    </div>
  );
}

export default LiveEvents;