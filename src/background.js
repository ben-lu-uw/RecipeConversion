import {scalableItems} from "./scalableItems.js";
chrome.runtime.onInstalled.addListener(async () => {
    chrome.storage.local.set({
        unit: 'g',
        scale: '1',
        scalableItems: scalableItems
    });
});