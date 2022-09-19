function unitChange() {
    chrome.storage.local.set({
        unit: this.value,
    }, function () {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            let id = tabs[0].id
            chrome.scripting.executeScript({target: {tabId: id}, files: ['unitChange.js']})
        })
    });
}

function scaleChange() {
    chrome.storage.local.set({
        scale: this.value
    }, function () {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            let id = tabs[0].id
            chrome.scripting.executeScript({target: {tabId: id}, files: ['scaleChange.js']})
        })
    })
}

function setDefault() {
    chrome.storage.local.get("unit", function (obj) {
        document.getElementById("units").value = obj.unit;
    })

    chrome.storage.local.get("scale", function (obj) {
        document.getElementById("scale").value = obj.scale;
    })
}

document.addEventListener("DOMContentLoaded", () => {
    setDefault()
    document.getElementById("units").addEventListener("change", unitChange)
    document.getElementById("scale").addEventListener("change", scaleChange)
});