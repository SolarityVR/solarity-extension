/*global chrome*/
// @ts-ignore

import React from 'react';
import ReactDOM from 'react-dom';
import $ from './jquery';
import App from "./app";
import { payIcon, roomIcon } from './icons'

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
  var gamingMenu = $(`<a href="#" aria-label="Gaming" role="button"
    class="css-4rbku5 css-18t94o4 css-1dbjc4n r-1habvwh r-1loqt21 r-6koalj r-eqz5dr r-16y2uox r-1ny4l3l r-oyd9sg r-13qz1uu"
    data-testid="AppTabBar_DirectMessage_Link">
    <div
      class="css-1dbjc4n r-1awozwy r-sdzlij r-18u37iz r-1777fci r-dnmrzs r-xyw6el r-o7ynqc r-6416eg">
      <div class="css-1dbjc4n">
        <svg xmlns="http://www.w3.org/2000/svg" class="r-1nao33i r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      </div>
      <div dir="auto"
        class="css-901oao css-bfa6kz r-1nao33i r-37j5jr r-adyw6z r-16dba41 r-135wba7 r-1joea0r r-88pszg r-bcqeeo r-qvutc0">
        <span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">
          Gaming
        </span>
      </div>
    </div>
  </a>`);

  $('a[href="https://twitter.com/messages"]').after(gamingMenu);
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