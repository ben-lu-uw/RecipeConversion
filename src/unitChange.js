function ozToG(oz) {
    return oz * 28.3495
}

function gToOz(g) {
    return g / 28.3495
}

//Normalize text
function cleanUp(text) {
    let parsed = text.replace(/\s\s+/g, ' ')
    parsed = parsed.replace(/\s-\s/g, '-')
    return parsed
}

chrome.storage.local.get("unit", function (obj) {
    let unit = obj.unit;
    let liList = document.getElementsByTagName('li');
    for (let i = 0; i < liList.length; i++) {
        let text = cleanUp(liList[i].innerText);

        if (unit === 'g') {
            let match = text.match(/(([0-9]*[.])?[0-9]+) ?oz/g);
            if(!match) continue;
            let oz = parseFloat(match[0])
            liList[i].innerText = liList[i].innerText.replace(/((([0-9]*[.])?[0-9]+)( +?oz|oz))/g, ozToG(oz) + " g")
        } else if(unit === 'oz') {
            let match = text.match(/(([0-9]*[.])?[0-9]+) ?g/g);
            if(!match) continue;
            let g = parseFloat(match[0])
            liList[i].innerText = liList[i].innerText.replace(/((([0-9]*[.])?[0-9]+)( +?g|g))/g, gToOz(g) + " oz")
        }
    }
})