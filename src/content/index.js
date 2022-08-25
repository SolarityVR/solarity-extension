/*global chrome*/

import React from 'react';
import ReactDOM from 'react-dom';
import $ from './jquery';
import GameModal from "./modal";

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

// Inject game modal to twitter page
const gameModal = document.createElement('div');
const tmpDiv = document.createElement('div');
gameModal.style.position="fixed";
gameModal.style.top='0px';
gameModal.style.left="0px";
gameModal.style.zIndex = "1000000";
gameModal.id = "game-modal";
document.body.appendChild(tmpDiv);
const shadowRoot = tmpDiv.attachShadow({mode: 'open'});
addStyleDom(shadowRoot, 'static/css/tailwind.css', true);
addStyleDom(shadowRoot, 'static/css/content.styles.css', true);
addCSS(chrome.runtime.getURL('static/css/content.css'))
shadowRoot.appendChild(gameModal);
ReactDOM.render(<GameModal />, gameModal);
gameModal.style.display= "none";

function addStyleDom(shadowRoot, href, flag) {
  const linkElem = document.createElement('link');
  linkElem.setAttribute('rel', 'stylesheet');
  if(flag) {
    linkElem.setAttribute('href', chrome.runtime.getURL(href));
  } else {
    linkElem.setAttribute('href', href);
  }
  shadowRoot.appendChild(linkElem);
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
  // addTwitterBtn();
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

  shadowRoot.getElementById('game-modal-close').onclick = (e) => {
    gameModal.style.display = "none";
  }

  //Inject logo
  // if(checkInTwitter(window.location.href)) {
    $('h1').append(logo);
    $('h1').css('cssText', 'display: flex !important;');
  // }

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