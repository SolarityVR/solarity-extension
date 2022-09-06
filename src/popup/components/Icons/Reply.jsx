import React from "react";

const Reply = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
        stroke={props.replyHover ? "#29b080" : "#292D32"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.00039 15.3787H13.9204C15.6204 15.3787 17.0004 13.9988 17.0004 12.2988C17.0004 10.5988 15.6204 9.21875 13.9204 9.21875H7.15039"
        stroke={props.replyHover ? "#29b080" : "#292D32"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.57 10.7691L7 9.18914L8.57 7.61914"
        stroke={props.replyHover ? "#29b080" : "#292D32"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Reply;