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
import Phantom from '../../assets/img/wallets/phantom.png';
import Slope from '../../assets/img/wallets/slope.png';

import LibraryMain from '../../assets/img/placeholder/library_main.png';

import Event2 from '../../assets/img/library/event2.png';
import PlazaImg from '../../assets/img/library/plaza.png';

import RoyaleImg from '../../assets/img/library/miniroyale.png';
import AuroryImg from '../../assets/img/library/aurory.png';
import OncyberImg from '../../assets/img/library/oncyber.png';

import LogoImg from '../../assets/img/logo.png';

export const WALLETS = [
  {
    label: "Phantom",
    id: "phantom",
    type: "solana",
    image: Phantom,
  },
  {
    label: "Solflare",
    id: "solflare",
    type: "solana",
    image: Slope,
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

export const SUGGESTED_FRIENDS = [
  {
    name: "Giana Bergson",
    img: Avatar1,
    status: "idle",
    isSelected: false
  },
  {
    name: "Giana Bergson",
    img: Avatar2,
    status: "idle",
    isSelected: false
  },
  {
    name: "Giana Bergson",
    img: Avatar3,
    status: "idle",
    isSelected: false
  },
  {
    name: "Giana Bergson",
    img: Avatar4,
    status: "idle",
    isSelected: false
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
    title: "Raj.verse",
    detail: "Grinding on Axie",
    time: "12:30PM",
    gap: 3,
    badge: 1
  },
  {
    image: <img src={Avatar6} width={52} height={52} />,
    title: "Super.verse",
    detail: "Minting Group Session",
    time: "2 minutes ago",
    gap: 3
  },

  {
    image: <img src={Avatar7} width={52} height={52} />,
    title: "Tmeta.verse",
    detail: "Live in OtherSide",
    time: "1 month ago",
    gap: 3
  },

];

export const LIVE_EVENT_ONLINE_USERS = [
  {
    img: Event2,
    title: 'Poker Night',
    time: "50 min",
    creator: {
      img: Avatar3,
      name: "MonkeDAO"
    },
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
    showUsers: 3,
    event: ''
  },
  {
    img: PlazaImg,
    title: 'Solarity Hall',
    time: "50 min",
    creator: {
      img: LogoImg,
      name: "Solarity"
    },
    users: [
      {
        img: Avatar6,
      },
      {
        img: Avatar4,
      },
      {
        img: Avatar2,
      },
      {
        img: Avatar3,
      },
      {
        img: Avatar7,
      }
    ],
    showUsers: 3,
    event: 'https://solarity-frontend.vercel.app/iframe/joinModal/plaza?name=tmeta'
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
    title: "Anatoly.verse",
    detail: "Grinding on Axie",
    time: "12:30PM",
    isActive: true,
  },
  {
    img: Avatar2,
    title: "Super.verse",
    detail: "Grinding on Axie",
    time: "12:30PM",
    isActive: true,
  },
  {
    img: Avatar3,
    title: "Raj.verse",
    detail: "Grinding on Axie",
    time: "12:30PM",
    isActive: false,
  },
  {
    img: Avatar4,
    title: "SBF.verse",
    detail: "Grinding on Axie",
    time: "12:30PM",
    isActive: false,
  },
];

export const ChattingBoxData = [
  {
      imgUrl : Avatar1,
      uName : "Konstantin1982.sol",
      before : "Today",
      text : "Hi, we are currently hiring a Minecraft Modder for MrBeast Gaming. We switched back to google forms so if you applied above or tried to apply, use this form instead."
  },
]

export const GAME_LIBRARIES = [
  {
    image: RoyaleImg,
    title: "Mini Royale",
    event: "https://miniroyale.io/"
  },
  {
    image: AuroryImg,
    title: "Aurory",
    event: "https://app.aurory.io/"
  },
  {
    image: OncyberImg,
    title: "OnCyber",
    event: "https://oncyber.io/6529om"
  },
];

export const EmojiListItemData = [
  "😀","😁","😂","🤣","😃","😄",
  "😅","😆","😉","😊","😋","😎",
  "😍","😘","🥰","😗","😙","😚",
  "🙂","🤗","🤩","🤔","🤨","😐",
  "😑","😶","🙄","😏","😣","😥",
  "😮","🤐","😯","😪","😫","🥱",
  "😴","😌","😛"
]