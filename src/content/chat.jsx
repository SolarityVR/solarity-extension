import React, { useState, useEffect } from "react";
import { Rnd } from 'react-rnd'
import { CloseIcon } from "./components/Icons";

const ChatModal = () => {
  const defaultStatus = {
    width: innerHeight * 85 / 100 * 16 / 9,
    height: innerHeight * 85 / 100,
    x: (innerWidth - (innerHeight * 85 / 100 * 16 / 9)) / 2,
    y: 0
  };

  const enabledResizing = {
    bottom: false,
    bottomLeft: true,
    bottomRight: true,
    left: false,
    right: false,
    top: false,
    topLeft: true,
    topRight: true,
  }

  const [chatModalState, setChatModalState] = useState(false);
  const [status, setStatus] = useState(defaultStatus);

  const innerWidth = window.innerWidth
  const innerHeight = window.innerHeight

  const onClose = () => {
    setChatModalState(false);
    setStatus(defaultStatus)
  }

  return (
    <Rnd
        className='transition-none'
        size={{ width: status.width, height: status.height }}
        position={{ x: status.x, y: status.y }}
        onDragStop={(e, d) => { setStatus({ ...status, x: d.x, y: d.y }) }}
        onResizeStop={(e, direction, ref, delta, position) => {
            setStatus({
                width: Number(ref.style.width),
                height: Number(ref.style.height),
                ...position,
            });
        }}
        lockAspectRatio={16 / 9}
        minHeight={'181'}
        maxHeight={'90vh'}
        minWidth={'300'}
        maxWidth={'90vw'}
        dragHandleClassName={'handleDraggling'}
        enableResizing={enabledResizing}
        bounds="window"
    >
      <div className={`modal-content w-[100%] h-[100%] flex flex-col relative bg-globalBgColor border-[1px] border-[#1d1f1f] rounded-[25px] resize select-none px-[10px] pb-[10px] pt-[30px]`}>
        <div className={`handleDraggling m-auto right-0 h-[15px] w-[95%] absolute top-0 left-0 z-[10000] rounded-[50px] overflow-hidden cursor-move`}>
          <div className='w-full h-full overflow-hidden rounded-[25px]'>
            <div className='fixed top-[5vh] left-[30px] cursor-pointer text-primary' onClick={() => {}}>
              123
            </div>
          </div>
        </div>
      </div>
    </Rnd>
  );

}

export default ChatModal