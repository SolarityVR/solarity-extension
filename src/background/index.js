import Config from "../config";

var twitterApp = {
  onExtMessage: function(message, sender, sendResponse){ 
    switch (message.command) {
      case "getInfoByWalletAddress":
        twitterApp.getInfoByWalletAddress(message.data, sender, sendResponse)
        break;
      case "getAllTokenPrices":
        twitterApp.getAllTokenPrices(message.data, sender, sendResponse)
        break;
    }
    return true;
  },
  // Fetch userInfo from backend with wallet address.
  getInfoByWalletAddress:function(address, sender, sendResponse){
    fetch(`${Config.BACKEND_URL}/api/users/${address}`)
      .then(async (response) => {
        var data = await response.json();
        if(data.user) {
          sendResponse({
            'success': true,
            "solanaAddress": data.user.solanaAddress,
            "response": data.user.rooms,
            "username": data.user.username
          });
        } else {
          sendResponse({
            'success': false,
            "response" : data.message
          });
        }
      })
      .catch((error) => {
        sendResponse({
          'success': false,
          "response" : error.message
        });
      })
  },
  // Fetch token prices from coingecko
  getAllTokenPrices:function(data, sender, sendResponse){
    var tokens=[{"type":'solana',"api":"https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"},{"type":"usdc","api":"https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=usd"}]

      var all_push_data_arr = [];
      var promise_all_urls_arr = [];
      for (var i = 0; i < tokens.length; i++) {
        var api = tokens[i]['api'];
        var type = tokens[i]['type'];
        promise_all_urls_arr.push(
          getProductReviewAsync(api,type)
          .then((apiResponse) => {
            all_push_data_arr.push(apiResponse);
          }) 
        );
      }
      Promise
      .all(promise_all_urls_arr)
      .then(() => {
        sendResponse(all_push_data_arr);
      }); 
  },
}
chrome.runtime.onMessage.addListener(twitterApp.onExtMessage);

function getProductReviewAsync(api, type) {
  return new Promise(async (resolve, reject) => {
    var data = await fetch(api);
    var data_json = await data.json();
    var rs = {'type': type, 'result': data_json}
    resolve(rs);
  });
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  chrome.tabs.sendMessage(tabId, {"command": "initTwitterEnv"});
});