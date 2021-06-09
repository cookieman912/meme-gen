'use strict'
var gCurrImg;
window.devicePixelRatio = 2;

function init() {
    renderMemes();
}


function loadInitialImage(currId) {
    gCurrImg = gImgs.find(image => {
        return image.id === currId
    })
    let source = gCurrImg.url
    document.querySelector('.template-container').classList.add('hidden')
    document.querySelector('.generator-container').classList.remove('hidden')
    gCurrImg = new Image();
    gCurrImg.src = source;
    renderImg(gCurrImg);
    drawText(gCurrTextLine, 150, 20)

}

function loadImage() {
    renderImg(gCurrImg);
    drawText(gLines[0], 150)
    drawText(gLines[1], 150)

}




function renderMemes() {
    var strHtmls = '<ul class="clean-list">';
    gImgs.forEach(img => {
        strHtmls += `<li><img onclick="loadInitialImage('${img.id}')" id=${img.id} src="${img.url}" alt=""></li>`
    })
    strHtmls += `</ul>`
    document.querySelector('.template-container').innerHTML = strHtmls


}

function renderImg() {
    gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function inputTyped(el) {
    switch (gCurrTextLineIdx) {
        case 0:
            clearCanvasPart(0)
            gLines[0].text = el.value

            break;

        case 1:
            clearCanvasPart(125)
            gLines[1].text = el.value
            break;
    }
    loadImage()

}

function drawText(line, x, ) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = `${line.fontSize}px IMPACT`
    gCtx.textAlign = 'center'
    gCtx.fillText(line.text, x, line.height)
    gCtx.strokeText(line.text, x, line.height)
}

function switchLines() {
    if (gCurrTextLineIdx === 1) {
        gCurrTextLine = gLines[0];
        gCurrTextLineIdx = 0;

    } else {
        gCurrTextLineIdx++;
        gCurrTextLine = gLines[gCurrTextLineIdx];

    }
    document.querySelector(".meme-text").value = gCurrTextLine.text;
}

function changeFontSize(changeValue) {
    gCurrTextLine.fontSize += changeValue;
    loadImage();
}

function changeTextLocation(changeValue) {
    gCurrTextLine.height += changeValue
    loadImage();

}

function clearCanvas() {


    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        // loadImage()

}




function clearCanvasPart(partValue) {
    gCtx.clearRect(0, partValue, gElCanvas.width, partValue + 25)
        // loadImage()

}