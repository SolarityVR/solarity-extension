/*global chrome*/
import React, { useState } from "react";
import { Rnd } from 'react-rnd'
import GameDetail from "./components/Custom/GameDetail";
import Library from "./components/Custom/Library";
import { ArrowLeft, CloseIcon } from "./components/Icons";
import LibraryLayout from "./components/LibraryLayout";
import '../assets/styles/tailwind.css';
import './content.styles.css';

const Modal = () => {
    const [gameLibraryToggle, setGameLibraryToggle] = useState(false);
    const [gameLibraryPageFlag, setGameLibraryPageFlag] = useState(0);
    const [isIframe, setIsIframe] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);

    const innerWidth = window.innerWidth
    const innerHeight = window.innerHeight

    const defaultStatus = {
        width: innerHeight * 85 / 100 * 16 / 9,
        height: innerHeight * 85 / 100,
        x: (innerWidth - (innerHeight * 85 / 100 * 16 / 9)) / 2,
        y: 0
    };
    const [status, setStatus] = useState(defaultStatus);
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

    const onClose = () => {
        setGameLibraryToggle(false);
        setIsIframe(false);
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
            dragHandleClassName={`${isIframe ? '' : 'handleDraggling'}`}
            enableResizing={enabledResizing}
            bounds="window"
        >
            <div className={`modal-content w-[100%] h-[100%] flex flex-col relative bg-globalBgColor border-[1px] border-[#1d1f1f] rounded-[25px] resize select-none ${isIframe ? '' : 'px-[10px] pb-[10px] pt-[30px]'}`}>
                <div className={`${isIframe ? '' : 'handleDraggling'} m-auto right-0 h-[15px] w-[95%] absolute top-0 left-0 z-[10000] rounded-[50px] overflow-hidden cursor-move`}></div>
                {
                    isIframe ?
                        <div className='w-full h-full overflow-hidden rounded-[25px]'>
                            <div className='fixed top-[5vh] left-[30px] cursor-pointer text-primary' onClick={() => setIsIframe(false)}>
                                <div className='flex rounded-lg bg-brandblack px-4 py-2'>
                                    <div className="mt-2">
                                        <ArrowLeft />
                                    </div>
                                    <span className='ml-3'>Back</span>
                                </div>
                            </div>
                            <iframe frameBorder="0" src={selectedGame.iframe} featurepolicy="{&quot;vr&quot;: [&quot;*&quot;]}" allow="camera;microphone;vr;" allowFullScreen={true} scrolling="no" width="100%" height="100%"></iframe>
                        </div>
                        :
                        <LibraryLayout>
                            {
                                gameLibraryPageFlag === 0 ?
                                    <Library setPage={setGameLibraryPageFlag} selectGame={setSelectedGame} />
                                    :
                                    <GameDetail setPage={setGameLibraryPageFlag} setIframe={setIsIframe} selectedGame={selectedGame} />
                            }
                        </LibraryLayout>
                }
                <div id="game-modal-close" className="z-[1000] absolute top-[15px] right-[15px] cursor-pointer">
                    <CloseIcon />
                </div>
            </div>
        </Rnd>
    );
}

export default Modal;