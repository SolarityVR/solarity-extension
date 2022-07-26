/*global chrome*/
// @ts-ignore

import React from 'react';
import ReactDOM from 'react-dom';
import $ from './jquery';
import App from "./App";
import { payIcon, roomIcon } from './icons'

var settings = {
  solana: 0,
  usdc: 0,
  verse: 0
}

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.command === 'initTwitterBtns') {
      if (window.locationUrl != undefined && window.locationUrl == window.location.href) {
        return;
      }
      window.locationUrl = window.location.href;
      setTimeout(function () {
        addTwitterBtn();
      }, 1000);
    }
  }
);

var B = document.createElement('script');
B.src = chrome.runtime.getURL('../../modules/bundle.js');
B.onload = function () {
  var w = document.createElement('script');
  w.src = chrome.runtime.getURL('../../modules/index.iife.js');
  w.onload = function () {
    this.remove();
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
  (document.head || document.documentElement).appendChild(w);
};
(document.head || document.documentElement).appendChild(B);

async function addTwitterBtn() {

  $('nav[aria-label="Profile timelines"]').each(function (index) {
    $(this).parent().attr('addition', 'pay');
  });
  $('.btn-twitter-exts').remove();

  var payBtn = $(`<div class="btn-twitter-exts pay-button css-1dbjc4n r-obd0qt r-18u37iz r-1w6e6rj r-1h0z5md r-dnmrzs" style="margin-bottom: 14px;margin-right:8px;cursor:pointer;" title="PAY">` + payIcon + `</div>`);
  var roomBtn = $(`<div class="btn-twitter-exts css-1dbjc4n r-obd0qt r-18u37iz r-1w6e6rj r-1h0z5md r-dnmrzs" style=" margin: 0px 8px 14px 0px;cursor:pointer" title="ROOM">` + roomIcon + `</div>`);
  var viewBtn = $(`<div class="btn-twitter-exts css-1dbjc4n r-obd0qt r-18u37iz r-1w6e6rj r-1h0z5md r-dnmrzs" style=" margin: 0px 8px 14px 0px;cursor:pointer;" title="VIEW">` + '<svg xmlns="http://www.w3.org/2000/svg" class="custom-icon-svg" style="width: 30px; height: 30px" fill="none" viewBox="0 0 24 24" stroke="#d3d3d3" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>' + `</div>`)

  $(payBtn).click(function (e) {
    var event = new CustomEvent('ReceiveContent', { detail: "connect-wallet" });
    window.dispatchEvent(event);
  });

  $('body .buttons').append(payBtn);
  //others profile
  $("div[data-testid='primaryColumn']").find("div:not([addition='pay']) > div[data-testid*='follow']").closest('[data-testid="placementTracking"]').before(payBtn);
  $("div[data-testid='primaryColumn']").find("div:not([addition='pay']) > div[data-testid*='follow']").closest('[data-testid="placementTracking"]').before(roomBtn);
  $("div[data-testid='primaryColumn']").find("div:not([addition='pay']) > div[data-testid*='follow']").closest('[data-testid="placementTracking"]').before(viewBtn);
  //your profile
  $('a[data-testid="editProfileButton"]').before(payBtn);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.command) {
    case 'connectWalletAction':
      var event = new CustomEvent('ReceiveContent', { detail: "connect-wallet" });
      window.dispatchEvent(event);
      break;
  }
})

window.addEventListener('ReceiveWallet', function (evt) {
  console.log(evt);
  // if (evt.detail.msg == "receive-wallet") {
  //   if (evt.detail.publicKey != undefined) {
  //     // const publicKey = evt.detail.publicKey;
  //   } else {
  //     alert('not connected solana');
  //   }
  // }
})