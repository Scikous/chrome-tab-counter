// Send message to background script when popup is loaded
window.onload = function() {
    chrome.runtime.sendMessage({ type: "popupLoaded" });
};

// Receive message from background script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === "numWindowTabsUpdated") {
        // Update the numTabs value in the popup HTML
        document.getElementById("numWindowTabs").innerText = message.numWindowTabs;
    }
    else if (message.type === "numAllTabsUpdated") {
        document.getElementById("numAllTabs").innerText = message.numAllTabs;
    }

});
