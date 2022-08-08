import React from "react";
import { Home, Inbox, User, Users, WinBar } from "../components/Icons";

export const WALLETS = [
  {
    label: "Phantom",
    id: "phantom",
    type: "solana",
    image: "../assets/img/wallets/phantom.png",
  },
  {
    label: "Solflare",
    id: "solflare",
    type: "solana",
    image: "../assets/img/wallets/solflare.png",
  }
];

export const MENU_ITEMS = [
  {
    name: 'home',
    content: <Home />,
  },
  {
    name: 'users',
    content: <Users />,
  },
  {
    name: 'inbox',
    content: <Inbox />,
  },
  {
    name: 'winbar',
    content: <WinBar />,
  },
  {
    name: 'user',
    content: <User />,
  }
];