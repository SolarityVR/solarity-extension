import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import defaultAvatar from '../../../../../assets/img/placeholder/avatar.png';
import { setUserMsg } from "../../../../redux/slices/chatSlice";
import { apiCaller } from "../../../../utils/fetcher";
import ChattingThread from './ChattingThread';

const ChattingThreadBox = (props) => {

  const dispatch = useDispatch();

  const { chatLogs, members } = useSelector((state) => ({
    chatLogs: state.chat.chatLogs,
    members: state.chat.members,
  }));

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await apiCaller.post("/chats/fetchMessages", { members });
        for (var i = 0; i < data.chat.msgs.length; i++) {
          dispatch(setUserMsg({
            groupType: data.chat.type,
            daoId: null,
            members: data.chat.users,
            sender: {
              name: data.chat.msgs[i].sender.username,
              profileImage: data.chat.msgs[i].sender.profileImage ? data.chat.msgs[i].sender.profileImage : null,
            },
            content: data.chat.msgs[i].content,
            reply: data.chat.msgs[i].reply,
            attachments: data.chat.msgs[i].attachments,
            date: data.chat.msgs[i].createdAt,
            editState: data.chat.msgs[i].editState,
            deleteState: data.chat.msgs[i].deleteState,
            msgId: data.chat.msgs[i]._id,
          }));
        }
      } catch (error) {
        console.error('Something went wrong.')
      }
    }
    fetchMessages();
  }, [])

  return (
    <div
      className={` flex custom-2xl:h-[80%] pt-14 xs:h-[80%] gap-[24px] relative `}
      id="chatting_thread_box"
    >
      <div
        className="flex flex-col px-[26px] w-full h-full overflow-y-scroll overflow-x-visible gap-[2px] relative pb-[30px]"
        id="chatting_thread_box_1"
      >
        {chatLogs.map((chatLog, index) => (
          <ChattingThread
            imgUrl={!!chatLog.sender.profileImage ? chatLog.sender.profileImage : defaultAvatar}
            uName={chatLog.sender.name}
            text={chatLog.content}
            date={chatLog.date}
            hisMsg={!!chatLog.reply.hisMsg ? chatLog.reply.hisMsg : ""}
            replyToWhom={chatLog.reply.replyToWhom}
            attachments={chatLog.attachments}
            fileNames={["__FOR__INITIAL__DATA__"]}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ChattingThreadBox;