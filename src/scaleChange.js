//Normalize text
function cleanUp(text) {
    let parsed = text.replace(/\s\s+/g, ' ')
    parsed = parsed.replace(/\s-\s/g, '-')
    return parsed
}

chrome.storage.local.get(["scalableItems", "scale"], function (obj) {
    let scalableItems = obj.scalableItems;
    let scale = obj.scale;
    console.log(scalableItems.length)

    let liList = document.getElementsByTagName('li');
    for (let i = 0; i < liList.length; i++) {
        let text = cleanUp(liList[i].innerText);

        let match = (text.match(/(([0-9]*[.])?[0-9]+) ?(.+)/g));
        if(!match) continue;

        if(match[0].match(/(([0-9]*[.])?[0-9]+) (sec|min|hour|h|day|month|year)/g)) continue;

        for(let j = 0; j < scalableItems.length; j++) {
            if(match[0].toLowerCase().includes(scalableItems[j])) {
                console.log(scalableItems[j])
                let num = parseFloat(match[0]);
                let scaled = num * scale
                liList[i].innerText = liList[i].innerText.replace(`${num}`, `${scaled}`);
                break;
            }
        }
    }
})