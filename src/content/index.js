/*global chrome*/

import React from 'react';
import ReactDOM from 'react-dom';
import Config from '../config';
import { payIcon } from './components/Icons/PayIcon';
import { roomIcon } from './components/Icons/RoomIcon';
import $ from './jquery';
import GameModal from "./modal";
import PayModal from './payModal';
import ChatModal from './chat';

var solanaAddress = '';
var settings = {
  solana: 0,
  usdc: 0,
  verse: 0
}

const logoImg = chrome.runtime.getURL('logo.png')
var B = document.createElement('script');
B.src = chrome.runtime.getURL('../../modules/bundle.js');
B.onload = function () {
  var w = document.createElement('script');
  w.src = chrome.runtime.getURL('../../modules/index.iife.js');
  w.onload = function () {
    this.remove();
    var bs = document.createElement('script');
    bs.src = chrome.runtime.getURL('../../modules/bs58.bundle.js');
    bs.onload = function () {
      var spl = document.createElement('script');
      spl.src = chrome.runtime.getURL('../../modules/spl_token.js');
      spl.onload = function () {
        var s = document.createElement('script');
        s.src = chrome.runtime.getURL('../../modules/background.js');
        s.onload = function () {
          this.remove();
        };
        (document.head || document.documentElement).appendChild(s);
      };
      (document.head || document.documentElement).appendChild(spl);
    };
    (document.head || document.documentElement).appendChild(bs);
  };
  (document.head || document.documentElement).appendChild(w);
};
(document.head || document.documentElement).appendChild(B);

class Main extends React.Component {

  render() {
    return <PayModal />
  }
}

const gameDiv = document.createElement('div');
const appDiv = document.createElement('div');
appDiv.id = 'app-div';
const gameModal = document.createElement('div');
const app = document.createElement('div');
const appModal = document.createElement('div');
const chatModal = document.createElement('div');
const gameShadowRoot = gameDiv.attachShadow({mode: 'open'});
const appShadowRoot = appDiv.attachShadow({mode: 'open'});
if(window.location.href.includes('http://') || window.location.href.includes('https://')) {
  // Inject game modal to twitter page
  gameModal.style.position="fixed";
  gameModal.style.top='0px';
  gameModal.style.left="0px";
  gameModal.style.zIndex = "1000000";
  gameModal.id = "game-modal";
  document.body.appendChild(gameDiv);
  addStyleDom(gameShadowRoot, 'static/css/tailwind.css', true);
  addStyleDom(gameShadowRoot, 'static/css/content.styles.css', true);
  addCSS(chrome.runtime.getURL('static/css/content.css'));
  gameShadowRoot.appendChild(gameModal);
  ReactDOM.render(<GameModal />, gameModal);
  gameModal.style.display= "none";

  // Inject payment modal to twitter page
  app.id = "twitter-pay-extension-root";
  document.body.appendChild(app);
  ReactDOM.render(<Main />, app);
  app.style.display = "none";

  // Inject room list modal to twitter page
  appModal.id = "twitter-extension-modal";
  appModal.style.position="fixed";
  appModal.style.top='0px';
  appModal.style.left="0px";
  appModal.style.zIndex = "1000000";
  document.body.appendChild(appDiv);
  addStyleDom(appShadowRoot, 'static/css/app.css', true);
  addStyleDom(appShadowRoot, 'static/css/modal.css', true);
  addStyleDom(appShadowRoot, 'static/css/root.css', true);
  appShadowRoot.appendChild(appModal)
  ReactDOM.render(<div className="modal">
    <div className="modal-content">
      <span className="close-button">×</span>
      <div className="modal-container">
      </div>
    </div>
  </div>, appModal);
  appModal.style.display="none";
}


function addStyleDom(gameShadowRoot, href, flag) {
  const linkElem = document.createElement('link');
  linkElem.setAttribute('rel', 'stylesheet');
  if(flag) {
    linkElem.setAttribute('href', chrome.runtime.getURL(href));
  } else {
    linkElem.setAttribute('href', href);
  }
  if(!!gameShadowRoot) {
    gameShadowRoot.appendChild(linkElem);
  }
}
///////////////////////////////////////////////////

// Listen for messages sent from background.js
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.command === 'initTwitterEnv') {
      if (window.locationUrl != undefined && window.locationUrl == window.location.href) {
        return;
      }
      window.locationUrl = window.location.href;
      setTimeout(function () {
        startCheckingTwitter();
      }, 1000);
    }
  }
);

function startCheckingTwitter() {
  addTwitterBtn();
  addTwitterMenuItem();
}

function addTwitterMenuItem() {
  $('.solarity-logo').remove();
  var logo = $(`<div class="solarity-logo" style="margin-left: 10px;cursor: pointer;" >
    <img src="${logoImg}" alt="solarity" width="30" height="30" />
  </div>`);

  $(logo).click(function (e) {
    if(gameModal.style.display == "none")
      gameModal.style.display = "block";
    else {
      gameModal.style.display = "none";
    }
  });

  if(!!gameShadowRoot) {
    gameShadowRoot.getElementById('game-modal-close').onclick = (e) => {
      gameModal.style.display = "none";
    }
  }

  //Inject logo
  // if(checkInTwitter(window.location.href)) {
    $('h1').append(logo);
    $('h1').css('cssText', 'display: flex !important;');
  // }

}

function addTwitterBtn() {
  $('nav[aria-label="Profile timelines"]').each(function (index) {
    $(this).parent().attr('addition', 'pay');
  });
  $('.btn-twitter-exts').remove();
  var payBtn = $(`
    <div 
      class="btn-twitter-exts css-1dbjc4n r-obd0qt r-18u37iz r-1w6e6rj r-1h0z5md r-dnmrzs" 
      style="margin-bottom: 14px;margin-right:8px;cursor:pointer;" 
      title="PAY"
    >
      ${payIcon}
    </div>`);
  var roomBtn = $(`
    <div 
      class="btn-twitter-exts css-1dbjc4n r-obd0qt r-18u37iz r-1w6e6rj r-1h0z5md r-dnmrzs" 
      style=" margin: 0px 8px 14px 0px;cursor:pointer" 
      title="ROOM"
    >
      ${roomIcon}
    </div>`);
  var viewBtn = $(`
    <div 
      class="btn-twitter-exts css-1dbjc4n r-obd0qt r-18u37iz r-1w6e6rj r-1h0z5md r-dnmrzs" 
      style=" margin: 0px 8px 14px 0px;cursor:pointer;" 
      title="VIEW"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="custom-icon-svg" 
        style="width: 30px; height: 30px" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="#d3d3d3" 
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    </div>`
  );
  $(roomBtn).click(function (e) {
    var twitter_name = parseUsername(window.location.href);
    appModal.style.display="block";
    if ($('.modal-container ul li').length == 0) {
      initModalBox();
    } else {
      $('body').append('<div class="cover"> loading...</div>');
      getUserInfo(twitter_name, true);
    }
  });

  $(payBtn).click(function (e) {

    if ($('.cover').length == 0) {
      $('body').append('<div class="cover"> loading...</div>');
    }
    var event = new CustomEvent('RecieveContent', { detail: "connect-wallet" });
    window.dispatchEvent(event);
  });

  $(viewBtn).click(function (e) {
    showVrBanner(`${Config.FRONTEND_URL}/iframe/joinModal/plaza`);
  })

  $('body .buttons').append(payBtn);
  $('body .buttons').append(roomBtn);
  $('body .buttons').append(viewBtn);
  //others profile
  $("div[data-testid='primaryColumn']").find("div:not([addition='pay']) > div[data-testid*='follow']").closest('[data-testid="placementTracking"]').before(payBtn);
  $("div[data-testid='primaryColumn']").find("div:not([addition='pay']) > div[data-testid*='follow']").closest('[data-testid="placementTracking"]').before(roomBtn);
  $("div[data-testid='primaryColumn']").find("div:not([addition='pay']) > div[data-testid*='follow']").closest('[data-testid="placementTracking"]').before(viewBtn);
  //your profile
  $('a[data-testid="editProfileButton"]').before(payBtn);
  $('a[data-testid="editProfileButton"]').before(roomBtn);
  $('a[data-testid="editProfileButton"]').before(viewBtn);

  initEvents()
  var twitter_name = parseUsername(window.location.href)
  getUserInfo(twitter_name, false); //default room loaded from here
}

function getUserInfoForPay() {
  sendMessage({ "command": "getInfoByWalletAddress", "data": parseUsername(window.location.href) }, function (result) {
    if (chrome.runtime.lastError) {
      setTimeout(getUserInfoForPay, 50);
    } else {
      $('body').find('.cover').hide();
      if (result.success) {
        solanaAddress = result.solanaAddress;
        initModalBoxPay('');
      } else {
        initModalBoxPay('You Can\'t pay to');
      }
      initEvents();
    }
  })
}

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
      initModalBoxPay();
    }
  }
);

function initModalBoxPay(isPay) {
  app.style.display = "block";
  $('.xl.block').removeClass('disaled-pay')
  if (isPay == '') {
    $('.send-username').html('Send to ' + parseUsername(window.location.href))
    $('#solarity-extension-payment').show();
  } else {
    $('.xl.block').addClass('disaled-pay');
    $('.send-username').html(`<div style="color:red;">` + isPay + ' ' + parseUsername(window.location.href) + `</div>`)
    $('#solarity-extension-payment').show();
  }
}

function getAllTokenPrices() {
  sendMessage({ "command": "getAllTokenPrices" }, function (result) {
    if (chrome.runtime.lastError) {
      setTimeout(getAllTokenPrices, 50)
    } else {
      for (var i = 0; i < result.length; i++) {
        if (result[i]['type'] == "solana") {
          settings.solana = result[i]['result']['solana']['usd'];
        }
        if (result[i]['type'] == "usdc") {
          settings.usdc = result[i]['result']['usd-coin']['usd']
        }
      }
      $('[name="input_amount"]').attr('data-settings', JSON.stringify(settings));
      var priceData = '$ ' + numberWithCommas(settings.solana);
      $('.xs-price').html(priceData);
    }
  })
}
setTimeout(() => {
  getAllTokenPrices();
}, 1500);

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getUserInfo(twitter_name, modal) {
  // Message to background to fetch user (name, rooms, solanaAddress)
  sendMessage({ "command": "getInfoByWalletAddress", "data": twitter_name }, function (result) {
    if (chrome.runtime.lastError) {
      setTimeout(getUserInfo, 50, twitter_name, modal);
    } else {
      $('body').find('.cover').remove();

      if (result.success) {
        // if fetch is success
        if (localStorage.getItem('solarity-selected-room-index') == undefined) {
          localStorage.setItem('solarity-selected-room-index', 0);
        }
        var data = result.response;
        if (data.length != 0) {
          var list = `<ul class="list-group">`;
          for (var i = 0; i < data.length; i++) {
            var selcted_room = (i == localStorage.getItem('solarity-selected-room-index') ? 'room-selected' : '');
            list += `<li class="${selcted_room}">
              <a 
                href="javascript:;" 
                class="buttonRoomSolana" 
                roomIndex="${i}" 
                vr="${Config.FRONTEND_URL}/${result.username}/room${data[i]['roomNo']}/${data[i]['_id']}"
              >
                ${data[i]['title']}
              </a>
            </li>`;
          }
          if (parseUsername(window.location.href) == Config.CLIENT_TWITTER_NAME) {
            // if Thomas, we need to display hub room on his profile
            list += `<li>
              <a 
                href="javascript:;" 
                class="buttonRoomSolana" 
                roomIndex="-1" 
                vr="${Config.FRONTEND_URL}/${result.username}/hub/"
              >
                Money Boy Hub
              </a>
            </li>`
          }
          list += `</ul>`;
          appShadowRoot.querySelector('.modal-container').innerHTML = list;
          var defaultRoom = $('.modal-container ul li:eq(0)', appShadowRoot).find('a').attr('vr');
          if (modal == false) {
            showVrBanner(defaultRoom);
          }
        } else {
          var errorHtml = `
            <h4>
              <strong>
                <a 
                  href="${Config.FRONTEND_URL}" 
                  target="_blank"
                >
                  Create a profile on our website
                </a>
              </strong>
            </h4>
            <div class="error">You don't have rooms available!!</div>
          `;
          appShadowRoot.querySelector('.modal-container').innerHTML = errorHtml;
        }
      } else {
        // if fetch is fail
        if (twitter_name == "SolanaMoneyBoys") {
          setRoomItem(-1, `/${Config.CLIENT_TWITTER_NAME}/hub`, "Money Boy Hub");
        } else if (twitter_name == "Solarity_VR") {
          setRoomItem(-1, "/frames/plaza", "Plaza");
        } else {
          var errorHtml = `
            <h4>
              <strong>
                <a 
                  href="${Config.FRONTEND_URL}" 
                  target="_blank"
                >
                  Create a profile on our website
                </a>
              </strong>
            </h4>
            <div class="error">${result.response}</div>
          `;
          appShadowRoot.querySelector('.modal-container').innerHTML = errorHtml;
        }
      }
      initEvents();
      if (modal) {
        initModalBox();
      }
    }
  });
}

function setRoomItem (roomIndex, vrURL, roomName) {
  var selcted_room = roomIndex == localStorage.getItem('solarity-selected-room-index') ? 'room-selected' : '';
  var list = `
    <ul class="list-group">
      <li 
        class="${selcted_room}"
      >
        <a 
          href="javascript:;"
          class="buttonRoomSolana" 
          roomIndex="${roomIndex}" 
          vr="${Config.FRONTEND_URL + vrURL}"
        >
          ${roomName}
        </a>
      </li>
    </ul>
  `;
  appShadowRoot.querySelector('.modal-container').innerHTML = list;
  var defaultRoom =  $('.modal-container ul li:eq(0)', appShadowRoot).find('a').attr('vr');
  if (modal == false) {
    showVrBanner(defaultRoom);
  }
}

function showVrBanner(vr) {
  //show room crausal here
  var injectNode = $('a[href$="/header_photo"]');
  // Clear Everything
  $('.slider').remove();
  $(injectNode).children().remove();
  // Inject carousel
  injectNode.prepend(`
    <div class="slider">
      <ul>
        <li class="c"> 
          <iframe 
            frameborder="0" 
            src="${vr}" 
            featurepolicy='{"vr": ["*"]}' 
            allow="camera;microphone;" 
            allowFullScreen="true" 
            scrolling="no" 
            width="100%" 
            height="100%"
          ></iframe> 
        </li>
      </ul>
    </div>
  `);
  initEvents();
}

function parseUsername(url) {
  return Config.CLIENT_TWITTER_NAME;
  let output = url;
  let matches;

  // Parse username
  matches = url.match(/(?:https?:\/\/)?(?:www.)?(?:twitter|medium|facebook|vimeo|instagram)(?:.com\/)?([@a-zA-Z0-9-_]+)/im);
  // Set output
  output = !!matches && matches.length ? matches[1] : output;
  
  return output;
}

function initModalBox() {
  var modal = appShadowRoot.querySelector(".modal");
  var closeButton = appShadowRoot.querySelector(".close-button");
  modal.classList.toggle("show-modal");

  closeButton.addEventListener("click", toggleModal);
  window.addEventListener("click", windowOnClick);
}

function windowOnClick(event) {
  var modal = appShadowRoot.querySelector(".modal");
  if (event.target === modal) {
    toggleModal();
  }
}

function initEvents() {
  $('a[href$="/header_photo"]').on('click', function (e) {
    e.preventDefault();
  });

  $('.buttonRoomSolana').off().on('click', function (e) {
    var vr = $(this).attr('vr');
    var index = $(this).attr('roomIndex');
    localStorage.setItem('solarity-selected-room-index', index);
    toggleModal();
    appShadowRoot.querySelector('.modal-container ul li').removeClass('room-selected');
    $(this).closest('li').addClass('room-selected');
    showVrBanner(vr);
  });

  $('.a-c-sign').keyup(function () {
    $(this).css('width', ($(this).val().length * 30) + 'px')

  });

  $('.btn-c-select').off().on('click', function (e) {
    const svg = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-check">
    <path d="M10 3L4.5 8.5L2 6" stroke="#1149FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>`;
    $('.btn-c-select').find('.svg-check').remove();
    $(this).append(svg);
  });
}

window.addEventListener('RecieveContentApp', function (evt) {
  if (evt.detail.msg == "pay-wallet") {

    var event = new CustomEvent('RecieveContent', { detail: { 'msg': "made-transaction", amoutn: evt.detail.amount, currency: evt.detail.currency, solanaAddress: solanaAddress } });
    window.dispatchEvent(event);
  }

})

window.addEventListener('RecieveWallate', function (evt) {
  if (evt.detail.msg == "recieve-wallet") {
    const publicKey = evt.detail.publicKey;
    getUserInfoForPay();
    //initModalBoxPay()
  }

})

function toggleModal() {
  var modal = appShadowRoot.querySelector(".modal");
  modal.classList.toggle("show-modal");
}

// Check if users are in Twitter website with url
function checkInTwitter(url) {
  let matches = url.match(/(?:https?:\/\/)?(?:www.)?(?:twitter)(?:.com\/)?([@a-zA-Z0-9-_]+)/im);
  if(!!matches && matches.length != 0) {
    return true;
  } else {
    return false
  }
}

// Add link tag on the website with specific url
function addCSS(url) {
  var s = document.createElement('link');
  s.rel = 'stylesheet';
  s.href = url;
  document.getElementsByTagName('head')[0].appendChild(s);
}

var callback = [];
function sendMessage(msg, callbackfn) {
  if (!!callbackfn && !!callback) {
    callback.push(callbackfn);
    msg.callback = "yes";
  }
  chrome.runtime.sendMessage(msg, callbackfn);
}

// Send action to background of content
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.command) {
    case 'login-wallet-connection-action':
      var event = new CustomEvent('login', { detail: { command: "wallet-connection" } });
      window.dispatchEvent(event);
      break;
    case 'login-get-signature-action':
      const { nonce, walletType, publicKey } = message;
      var event = new CustomEvent('login', { detail: { command: "get-signature", nonce, walletType, publicKey } });
      window.dispatchEvent(event);
      break;
    case 'open-game-modal-action':
      gameModal.style.display = "block";
      break;
    case 'open-popup-modal-action':
      gameModal.style.display = "block";
      break;
  }
})

// Get the result of background of content
window.addEventListener('login-result', function (evt) {
  switch (evt.detail.msg) {
    case 'wallet-connected':
      if (evt.detail.publicKey != undefined) {
        chrome.runtime.sendMessage({ "command": "wallet-connected", "publicKey": evt.detail.publicKey });
      }
      break;
    case 'receive-signature':
      if (evt.detail.signature != undefined) {
        chrome.runtime.sendMessage({ "command": "receive-signature", "signature": evt.detail.signature, publicKey: evt.detail.publicKey, walletType: evt.detail.walletType });
      }
      break;
  }
})