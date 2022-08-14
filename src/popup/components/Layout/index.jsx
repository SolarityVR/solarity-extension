import React from "react";

const Layout = (props) => {
  return (
    <div className="w-full h-full">
      <div className=" absolute top-0 w-full">
        {props.header}
      </div>
      <div className="p-6 !pt-[95px]">
        {props.children}
      </div>
      {props.footer}
    </div>
  );
}

export default Layout;