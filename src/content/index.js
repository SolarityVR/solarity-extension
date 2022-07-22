/*global chrome*/
// @ts-ignore

import React from 'react';
import ReactDOM from 'react-dom';
import $ from './jquery'; 
import App from "./App";
import { payIcon, roomIcon } from './icons'
import * as web3 from '@solana/web3.js';
import { PublicKey, Transaction } from "@solana/web3.js";

var settings={
  solana:0,
  usdc:0,
  verse:0
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.command === 'initTwitterBtns') {
      if(window.locationUrl != undefined && window.locationUrl == window.location.href) {
        return;
      }
      window.locationUrl = window.location.href;
      // setTimeout(function(){
      //   startchekingTwitter();
      // }, 1000);
    }
});

var B = document.createElement('script');
B.src = chrome.runtime.getURL('../../modules/bundle.js');
B.onload = function() {
  var w = document.createElement('script');
  w.src = chrome.runtime.getURL('../../modules/index.iife.js');
  w.onload = function() {
    this.remove();
    var spl = document.createElement('script');
    spl.src = chrome.runtime.getURL('../../modules/spl_token.js');
    spl.onload = function() {
      var s = document.createElement('script');
      s.src = chrome.runtime.getURL('../../modules/background.js');
      s.onload = function() {
        this.remove();
      };
      (document.head || document.documentElement).appendChild(s);
    };
    (document.head || document.documentElement).appendChild(spl);
  };
  (document.head || document.documentElement).appendChild(w);  
};
(document.head || document.documentElement).appendChild(B);