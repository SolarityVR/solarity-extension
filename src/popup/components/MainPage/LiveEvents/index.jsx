import React from "react";
import { EventItemTemplate } from "../../Panels";
import { LIVE_EVENT_ONLINE_USERS } from "../../../data";

const LiveEvents = (props) => {

  const openGameModal = (event, title) => {
    if (event == '') {
      alert('comming soon');
    } else {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          command: 'open-game-modal-action',
          event: event,
          title: title
        });
      });
    }
  }

  return (
    <div className="p-6 border border-semiSplitter">
      <div className="text-xl leading-normal font-medium text-white pb-1">
        Live Events
      </div>
      <div className="grid gap-3">
        {LIVE_EVENT_ONLINE_USERS.map((liveEvent, index) => (
          <div
            key={index}
            onClick={() => openGameModal(liveEvent.event, liveEvent.title)}
          >
            <EventItemTemplate
              image={<img src={liveEvent.img} width={95} height={78} className="rounded-md" />}
              title={liveEvent.title}
              creator={liveEvent.creator}
              nextIcon={true}
              time="50 min"
              gap="3"
              onlineUsers={liveEvent.users}
              showUsers={liveEvent.showUsers}
              button={"Join"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LiveEvents;