import React from "react";
import { SearchInput } from "../../components/Forms";
import FriendList from "../../components/MainPage/FriendList";

const FriendPage = () => {
  return (
    <div>
      <SearchInput />
      <FriendList />
      {/* <Flocks /> */}
    </div>
  );
}

export default FriendPage;