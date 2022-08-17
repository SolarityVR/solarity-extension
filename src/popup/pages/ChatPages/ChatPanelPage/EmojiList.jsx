import React from "react"
import { EmojiListItemData } from "../../../data"
import EmojiListItem from "./EmojiListItem"

const EmojiList = (props) => {
  return (
    <div className={` ${props.showEmoji ? "block" : "hidden"} grid grid-cols-6 absolute bottom-[50px]
                        right-[-50px] w-[240px] bg-[#131314] p-[12px] border-[1.5px] border-[#3f3f43] rounded-[12px]
                        select-none `}>
      {
        EmojiListItemData.map((i, index) => {
          return <EmojiListItem item={i} key={index} />
        })
      }
    </div>
  )
}

export default EmojiList