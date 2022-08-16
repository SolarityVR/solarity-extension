import React from "react";
import { Home, Inbox, User, Users, WinBar } from "../components/Icons";
// For avatars
import Avatar1 from '../../assets/img/library/avatars/1.png';
import Avatar2 from '../../assets/img/library/avatars/2.png';
import Avatar3 from '../../assets/img/library/avatars/3.png';
import Avatar4 from '../../assets/img/library/avatars/4.png';
import Avatar5 from '../../assets/img/library/avatars/5.png';
import Avatar6 from '../../assets/img/library/avatars/6.png';
import Avatar7 from '../../assets/img/library/avatars/7.png';

// For flocks
import Yield from '../../assets/img/library/flocks/yield.png';
import Monke from '../../assets/img/library/flocks/monke.png';
import BAYC from '../../assets/img/library/flocks/BAYC.png';

// For wallets
import MaticLogo from '../../assets/img/wallets/matic_logo.png';
import EthLogo from '../../assets/img/wallets/eth_logo.png';
import SolLogo from '../../assets/img/wallets/sol_logo.png';

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

export const FRIENDS = [
  {
    img: Avatar1,
    isActive: true
  },
  {
    img: Avatar2,
    isActive: true
  },
  {
    img: Avatar3,
    isActive: false
  },
  {
    img: Avatar4,
    isActive: false
  }
];

export const FLOCKS = [
  {
    img: Yield,
    title: "Yield Guild",
    detail: "Grinding on Axie",
    time: "12:30PM"
  },
  {
    img: Monke,
    title: "Monke DAO",
    detail: "Minting Group Session",
    time: "2 minutes ago"
  },
  {
    img: BAYC,
    title: "BAYC Guild",
    detail: "Live in OtherSide",
    time: "1 month ago"
  },
];

export const CHATS = [
  {
    image: <img src={Avatar5} width={52} height={52} />,
    title: "Yield Guild",
    detail: "Grinding on Axie",
    time: "12:30PM",
    gap: 3,
    badge: 1
  },
  {
    image: <img src={Avatar6} width={52} height={52} />,
    title: "Monke DAO",
    detail: "Minting Group Session",
    time: "2 minutes ago",
    gap: 3
  },

  {
    image: <img src={Avatar7} width={52} height={52} />,
    title: "BAYC Guild",
    detail: "Live in OtherSide",
    time: "1 month ago",
    gap: 3
  },

];

export const LIVE_EVENT_ONLINE_USERS = [
  {
    title: 'Shareholders’ meeting',
    time: "50 min",
    users: [
      {
        img: Avatar1,
      },
      {
        img: Avatar2,
      },
      {
        img: Avatar3,
      },
      {
        img: Avatar4,
      },
      {
        img: Avatar5,
      }
    ],
    showUsers: 3
  }
];


export const WalletBalanceData = [
  {
    kind : 'SOL',
    balance : 0.03,
    icon_url : SolLogo,
    addr : '1z99'
  },
  {
    kind : 'ETH',
    balance : 0.19,
    icon_url : EthLogo,
    addr : '2x20'
  },
  {
      kind : 'MATIC',
      balance : 0.024,
      icon_url : MaticLogo,
      addr : '1z99'
  },
]

export const FRIEND_LIST_DATA = [
  {
    img: Avatar1,
    title: "Yield Guild",
    detail: "Grinding on Axie",
    time: "12:30PM",
    isActive: true,
  },
  {
    img: Avatar1,
    title: "Yield Guild",
    detail: "Grinding on Axie",
    time: "12:30PM",
    isActive: true,
  },
  {
    img: Avatar7,
    title: "Yield Guild",
    detail: "Grinding on Axie",
    time: "12:30PM",
    isActive: false,
  },
  {
    img: Avatar7,
    title: "Yield Guild",
    detail: "Grinding on Axie",
    time: "12:30PM",
    isActive: false,
  },
];