/*global chrome*/
// @ts-ignore

import React from 'react';
import ReactDOM from 'react-dom';
import $ from './jquery';
import App from "./App";
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