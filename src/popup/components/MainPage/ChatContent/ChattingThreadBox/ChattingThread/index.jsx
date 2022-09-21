import React, { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useDispatch, useSelector } from "react-redux";
import { setReply } from "../../../../../redux/slices/chatSlice";
import { formatAMPM } from "../../../../../utils";

import { Reply } from "../../../../Icons";
import ImgFileType from "./ImgFileType";
import OtherFileType from "./OtherFileType";

const ChattingThread = (props) => {
  const [showReplyBtn, setShowReplyBtn] = useState(false);
  const [replyHover, setReplyHover] = useState(false);
  const [msg, setMsg] = useState("");
  const [hisMsg, setHisMsg] = useState("");

  const dispatch = useDispatch();

  const { profile } = useSelector((state) => ({
    profile: state.auth.profile,
  }));

  useEffect(() => {
    let box = document.getElementById("chatting_thread_box_1");
    let height = box.scrollHeight + 113;
    box.scroll({ top: height, behavior: "smooth" });

    let tempMsg = props.text;

    let urlArray = tempMsg.match(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
    );

    if (urlArray != null) {
      let uniqueUrlArray = [];
      urlArray.forEach((element) => {
        if (!uniqueUrlArray.includes(element)) {
          uniqueUrlArray.push(element);
        }
      });

      for (let j in uniqueUrlArray) {
        let regExp = new RegExp(uniqueUrlArray[j], "g");
        tempMsg = tempMsg.replace(
          regExp,
          "<a href='" +
          uniqueUrlArray[j] +
          "' class='urlPart text-primary' target='__blank'>" +
          uniqueUrlArray[j] +
          "</a>"
        );
      }
    }
    let nameArray = tempMsg.match(/@[-a-zA-Z0-9@._#]{1,256}/g);
    if (nameArray != null) {
      let uniqueNameArray = [];
      nameArray.forEach((element) => {
        if (!uniqueNameArray.includes(element)) {
          uniqueNameArray.push(element);
        }
      });

      for (let j in uniqueNameArray) {
        let regExp = new RegExp(uniqueNameArray[j], "g");
        tempMsg = tempMsg.replace(
          regExp,
          "<a href='#' class='namePart'>" + uniqueNameArray[j] + "</a>"
        );
      }
    }

    setMsg(tempMsg);

    let tempHisMsg = props.hisMsg;

    let urlHisArray = tempHisMsg.match(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
    );

    if (urlHisArray != null) {
      let uniqueUrlHisArray = [];
      urlHisArray.forEach((element) => {
        if (!uniqueUrlHisArray.includes(element)) {
          uniqueUrlHisArray.push(element);
        }
      });

      for (let j in uniqueUrlHisArray) {
        let regExp = new RegExp(uniqueUrlHisArray[j], "g");
        tempHisMsg = tempHisMsg.replace(
          regExp,
          "<a href='" +
          uniqueUrlHisArray[j] +
          "' class='urlPart text-primary' target='__blank'>" +
          uniqueUrlHisArray[j] +
          "</a>"
        );
      }
    }
    let nameHisArray = tempHisMsg.match(/@[-a-zA-Z0-9@._#]{1,256}/g);
    if (nameHisArray != null) {
      let uniqueNameHisArray = [];
      nameHisArray.forEach((element) => {
        if (!uniqueNameHisArray.includes(element)) {
          uniqueNameHisArray.push(element);
        }
      });

      for (let j in uniqueNameHisArray) {
        let regExp = new RegExp(uniqueNameHisArray[j], "g");
        tempHisMsg = tempHisMsg.replace(
          regExp,
          "<a href='#' class='namePart text-primary'>" + uniqueNameHisArray[j] + "</a>"
        );
      }
    }
    setHisMsg(tempHisMsg);
  }, [props.text]);

  const reply = (replyToWhom, hisMsg, replyId) => {
    dispatch(setReply({ replyToWhom, hisMsg, replyId }));
  }

  return (
    <div
      className={`flex ${props.uName === profile.username ? 'flex-row-reverse' : 'flex-row'} gap-[16px] items-start justify-start`}
      onDragStart={(e) => e.preventDefault()}
      onMouseEnter={() => setShowReplyBtn(true)}
      onMouseLeave={() => setShowReplyBtn(false)}
    >
      {/* Avatar Part */}
      <div className={`min-h-[40px] min-w-[40px] rounded-[15px] overflow-hidden relative ${props.uName === profile.username ? "hidden" : ""}`}>
        <img src={props.imgUrl} width={40} height={40} />
      </div>
      <div className=" flex flex-col gap-[10px] justify-between items-start md:w-[278px] xs:max-w-[100%]">
        {/* Header of Msg */}
        <div className={` flex flex-row gap-[10px] justify-start items-center  ${props.uName === profile.username ? "hidden" : ""}`}>
          <div
            className={` font-['Outfit'] text-[14px] ${props.uName === profile.username ? "text-[#f3f3f3]" : "text-[#929298]"
              } `}
          >
            {props.uName}
          </div>
        </div>
        <div
          className={` flex flex-col md:max-w-[240px] xs:max-w-[240px] ${props.uName === profile.username ? "rounded-tl-[10px] rounded-tr-[3px]" : "rounded-tl-[3px] rounded-tr-[10px]"} rounded-bl-[10px] rounded-br-[10px] break-all whitespace-pre-wrap
                                pt-[5px] pb-[3px] px-[15px] ${props.uName === profile.username
              ? "bg-[#3f3f43]"
              : "bg-[#1d1d1e]"
            } font-[400] text-[16px] text-[#b3b3b7] leading-[150%] relative`}
        >
          {/* Msg Part */}
          <div
            className={` font-['Outfit'] text-[14px] font-[400] text-[#b3b3b7] italic pb-[10px] border-b-[1px] border-b-[#b3b3b7]
                          ${!props.hisMsg || props.hisMsg === "" ? "hidden" : ""}`}
          >
            " {ReactHtmlParser(hisMsg)} "
            <div
              className={` font-['Outfit'] text-[12px] font-[400] text-[#b3b3b7] not-italic`}
            >
              {props.replyToWhom}
            </div>
          </div>
          <div>{ReactHtmlParser(msg)}<span className="text-grey text-[12px] font-['Outfit'] pt-1 pl-2 float-right">{formatAMPM(new Date(props.date))}</span></div>
          {/* Reply Part */}
          <div
            className={`absolute ${showReplyBtn ? "flex" : "hidden"
              } top-[0px] right-[-26px] cursor-pointer ml-[30px]`}
            onMouseEnter={() => setReplyHover(true)}
            onMouseLeave={() => setReplyHover(false)}
            onClick={() => reply(props.uName, props.text, props.msgId)}
          >
            <Reply replyHover={replyHover} />
          </div>
        </div>

        <div>
          {props.attachments.files.length != 0 &&
            props.attachments.files.map((file, index) => {
              let currentFileName = "";
              if (props.fileNames.length > 0) {
                if (props.fileNames[0] === "__FOR__INITIAL__DATA__") {
                  currentFileName = file.url;
                } else {
                  currentFileName = file.name;
                }
              }

              let extensionPoint = currentFileName.lastIndexOf(".");
              let extension = currentFileName.substring(extensionPoint + 1);
              let onlyName = currentFileName.substring(0, extensionPoint);

              if (["jpg", "png", "bmp", "webp", "svg", "tiff", "jpeg", "gif", "tif", "dib"].findIndex(s => s == extension) != -1) {
                return (
                  <ImgFileType
                    key={index}
                    fileUrl={file.url}
                    setSelectedFile={"__FOR__UPLOADED__FILES__"}
                    selectedFile={"__FOR__UPLOADED__FILES__"}
                    fileName={currentFileName}
                  />
                );
              } else {
                return (
                  <OtherFileType
                    key={index}
                    selectedFile={"__FOR__UPLOADED__FILES__"}
                    fileName={onlyName}
                    extension={extension.toUpperCase()}
                    fileUrl={file.urls}
                    setSelectedFile={"__FOR__UPLOADED__FILES__"}
                    originName={currentFileName}
                  />
                );
              }
            })}
        </div>
      </div>
    </div>
  );
}

export default ChattingThread;