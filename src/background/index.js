chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tabId) {
    chrome.tabs.sendMessage(tabId, { "command": "initTwitterBtns", "changeInfo": changeInfo });
  } else {
    chrome.runtime.sendMessage(sender.id, { "command": "initTwitterBtns", "changeInfo": changeInfo });
  }
});

