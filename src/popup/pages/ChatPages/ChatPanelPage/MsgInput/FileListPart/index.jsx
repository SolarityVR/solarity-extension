import React from "react";

import OtherFileInputType from "./OtherFileInputType";
import ImgFileInputType from "./ImgFileInputType";

const FileListPart = (props) => {
  let j = 0;
  return (
    <div
      id="file_list_part"
      className={` items-start gap-[16px] overflow-x-scroll overflow-y-visible rounded-bl-[15px] rounded-br-[15px]
                                        ${props.selectedFile.length != 0
          ? "flex px-[15px] py-[5px]"
          : "hidden"
        } `}
    >
      {props.selectedFile &&
        props.preview.map((i) => {
          if (props.selectedFile[j] != undefined) {
            let currentFileName = props.selectedFile[j].name;
            let extensionPoint = currentFileName.lastIndexOf(".");
            let extension = currentFileName.substring(extensionPoint + 1);
            let onlyName = currentFileName.substring(0, extensionPoint);
            j++;
            if (["jpg", "png", "bmp", "webp", "svg", "tiff", "jpeg", "gif", "tif", "dib"].findIndex(s => s == extension) != -1) {
              return (
                <ImgFileInputType
                  key={j}
                  fileUrl={i}
                  setSelectedFile={props.setSelectedFile}
                  selectedFile={props.selectedFile}
                  fileName={currentFileName}
                />
              );
            } else {
              return (
                <OtherFileInputType
                  key={j}
                  selectedFile={props.selectedFile}
                  fileName={onlyName}
                  extension={extension.toUpperCase()}
                  fileUrl={i}
                  setSelectedFile={props.setSelectedFile}
                  originName={currentFileName}
                />
              );
            }
          }
        })}
    </div>
  );
};

export default FileListPart;
