import React from "react";
import ItemTemplate from "../../Panels/ItemTemplate";
import { GAME_LIBRARIES } from "../../../data";

const RecommendedQuest = (props) => {
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
    <div className="p-6">
      <div className="text-xl leading-normal font-medium text-white pb-1">
        Game Library
      </div>
      <div className="grid gap-y-3">
        {GAME_LIBRARIES.map((item, index) => (
          <div
            key={index}
            onClick={() => openGameModal(item.event, item.title)}
          >
            <ItemTemplate
              image={<img src={item.image} width={72} height={72} className="rounded-md" />}
              title={item.title}
              gap="6"
              button="Play now"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedQuest;