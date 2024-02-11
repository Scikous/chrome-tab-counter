function updateBadge() {
    chrome.tabs.query({ 'currentWindow': true }, function(tabs) {
        var numTabs = tabs.length;
        chrome.action.setBadgeText({ text: numTabs.toString() });
        // Send message to popup HTML
        chrome.runtime.sendMessage({ type: "numWindowTabsUpdated", numWindowTabs: numTabs });
    });
    chrome.tabs.query({ 'windowType': 'normal' }, function(tabs) {
        var numTabs = tabs.length;
        // Send message to popup HTML
        chrome.runtime.sendMessage({ type: "numAllTabsUpdated", numAllTabs: numTabs });
    });
    
}

// Update badge on initial load
updateBadge();

// Update badge when tabs are created, removed, or replaced
chrome.tabs.onCreated.addListener(updateBadge);
chrome.tabs.onRemoved.addListener(updateBadge);
chrome.tabs.onReplaced.addListener(updateBadge);

// Listen for message from popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === "popupLoaded") {
        // Update badge when popup is loaded
        updateBadge();
    }
});
