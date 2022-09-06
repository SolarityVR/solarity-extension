import React from "react";
import EmojiList from "./EmojiList";

const EmojiButton = (props) => {
  return (
    <div className="flex cursor-pointer relative" onClick={props.onClick}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 16C5.86312 16 3.85416 15.1678 2.34313 13.6569C0.832156 12.1458 0 10.1369 0 8C0 5.86312 0.832156 3.85416 2.34313 2.34313C3.85416 0.832156 5.86312 0 8 0C10.1369 0 12.1458 0.832156 13.6569 2.34313C15.1678 3.85416 16 5.86312 16 8C16 10.1369 15.1678 12.1458 13.6569 13.6569C12.1458 15.1678 10.1369 16 8 16ZM8 1.25C4.27803 1.25 1.25 4.27803 1.25 8C1.25 11.722 4.27803 14.75 8 14.75C11.722 14.75 14.75 11.722 14.75 8C14.75 4.27803 11.722 1.25 8 1.25ZM10.9293 9.38087C10.6381 9.19553 10.2517 9.28137 10.0665 9.57263C10.0588 9.58472 9.28094 10.7832 7.96875 10.7832C6.65656 10.7832 5.87875 9.58472 5.87103 9.57263C5.68572 9.28141 5.29944 9.19556 5.00822 9.38087C4.717 9.56619 4.63116 9.9525 4.81647 10.2437C4.86297 10.3168 5.97809 12.0332 7.96875 12.0332C9.95941 12.0332 11.0745 10.3168 11.121 10.2437C11.3063 9.95247 11.2205 9.56619 10.9293 9.38087ZM5.25 5.15625C5.68147 5.15625 6.03125 5.50603 6.03125 5.9375C6.03125 6.36897 5.68147 6.71875 5.25 6.71875C4.81853 6.71875 4.46875 6.36897 4.46875 5.9375C4.46875 5.50603 4.81853 5.15625 5.25 5.15625ZM9.9375 5.9375C9.9375 6.36897 10.2873 6.71875 10.7188 6.71875C11.1502 6.71875 11.5 6.36897 11.5 5.9375C11.5 5.50603 11.1502 5.15625 10.7188 5.15625C10.2873 5.15625 9.9375 5.50603 9.9375 5.9375Z"
          fill={props.showEmoji ? "#29b080" : "#474749"}
        />
      </svg>
      <EmojiList showEmoji={props.showEmoji} />
    </div>
  );
};

export default EmojiButton;
