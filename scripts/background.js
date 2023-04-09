// background.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.command == "getLocalStorage") {
        var data = localStorage[request.key];
        sendResponse({ data: data });
    }
});
