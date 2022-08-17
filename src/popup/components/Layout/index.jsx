import React from "react";

const Layout = (props) => {
  return (
    <div className="w-full h-full">
      {props.pageStages != 9 && (
        <div className=" absolute top-0 w-full">
          {props.header}
        </div>
      )}
      <div className={"py-6 " + (props.pageStages != 9 ? "!pt-[81px]" : "")}>
        <div className={"ui-chat overflow-y-auto " + (props.pageStages != 9 ? "h-[476px]" : "h-[557px]")}>
          {props.children}
        </div>
      </div>
      {props.footer}
    </div>
  );
}

export default Layout;