import React from "react";
import { SearchInput } from "../../components/Forms";
import Flocks from "../../components/MainPage/Flocks";
import FriendList from "../../components/MainPage/FriendList";

const FriendPage = () => {
  return (
    <div className="pt-[15px] ">
      <SearchInput />
      <FriendList />
      <Flocks />
    </div>
  );
}

export default FriendPage;