import React from "react";

const Layout = (props) => {
  return (
    <div className="w-full h-full">
      <div className=" absolute top-0 w-full">
        {props.header}
      </div>
      <div className="py-6 !pt-[81px]">
        <div className="h-[526px] overflow-y-auto">
          {props.children}
        </div>
      </div>
      {props.footer}
    </div>
  );
}

export default Layout;