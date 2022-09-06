import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReplyInput } from "../../../../../components/Icons";
import { setNewMsg } from "../../../../../redux/slices/chatSlice";

const ReplyPart = (props) => {
  const dispatch = useDispatch();
  const { newMsg } = useSelector((state) => ({
    newMsg: state.chat.newMsg,
  }));
  return (
    <div
      id="reply_part"
      className={` justify-between items-start gap-[12px] bg-[#2C2C2E] ${newMsg.reply.replying ? "flex" : "hidden"
        } px-[15px] py-[5px] rounded-tl-[13px] rounded-tr-[13px]`}
    >
      <ReplyInput />
      <div className="flex flex-col font-[400] text-[12px] w-[70%]">
        <div className="flex flex-row text-primary">
          {newMsg.reply.replyToWhom}
        </div>
        <div className="flex flex-row text-[#b3b3b7]">
          {newMsg.reply.hisMsg}
        </div>
      </div>

      <div
        className="cursor-pointer"
        onClick={() =>
          dispatch(setNewMsg({
            ...newMsg,
            reply: { replying: false, replyToWhom: "", hisMsg: "" },
          }))
        }
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
            fill="#3f3f43"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.16992 14.8299L14.8299 9.16992"
            stroke="#b3b3b7"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.8299 14.8299L9.16992 9.16992"
            stroke="#b3b3b7"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default ReplyPart;
