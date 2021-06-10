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
    document.querySelector('.gallery-container').classList.add('hidden')
    document.querySelector('.generator-container').classList.remove('hidden')
    document.querySelector('.generator-container').classList.add('flex')
    gCurrImg = new Image();
    gCurrImg.src = source;
    renderImg(gCurrImg);
    drawText(gCurrTextLine, 150, 20)

}

function loadImage() {
    renderImg(gCurrImg);
    gLines.forEach((line) => {
        drawText(line)
    })
    drawBox(gCurrTextLine.x, gCurrTextLine.y)
    drawText(gCurrTextLine)

}




function renderMemes() {
    var strHtmls = '';
    gImgs.forEach(img => {
        strHtmls += `<div class="meme-grid-item"><img onclick="loadInitialImage('${img.id}')" id=${img.id} src="${img.url}" alt=""></div>`
    })
    document.querySelector('.template-container').innerHTML = strHtmls


}

function renderImg() {
    gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function inputTyped(el) {
    gCurrTextLine.text = el.value;
    gLines.forEach((line) => {
        clearCanvasPart(line.y)

    });
    loadImage();

}

function drawText(line) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = `${line.fontSize}px IMPACT`
    gCtx.textAlign = 'center'
    gCtx.fillText(line.text, line.x, line.y)
    gCtx.strokeText(line.text, line.x, line.y)
}

function drawBox(x, y) {
    gCtx.beginPath()
    gCtx.rect(x - 120, y - 20, x + 90, y + 20)
    console.log(x - 120, y - 20, x + 90, y + 20);
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}

function switchLines() {
    if (gCurrTextLine.id === gTextId - 1) {
        console.log('in condition');
        gCurrTextLine = gLines[0];

    } else {

        gCurrTextLine = gLines[gCurrTextLine.id + 1];

    }
    console.log(gCurrTextLine);
    document.querySelector(".meme-text").value = gCurrTextLine.text;
}

function changeFontSize(changeValue) {
    gCurrTextLine.fontSize += changeValue;
    loadImage();
}

function changeTextLocation(changeValue) {
    gCurrTextLine.y += changeValue
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

function returnToGallery() {
    document.querySelector('.gallery-container').classList.remove('hidden')
    document.querySelector('.generator-container').classList.add('hidden')
    document.querySelector('.generator-container').classList.remove('flex')
    gTextId = 0;
    gLines = [_buildLine(20), _buildLine(130)]
    gCurrTextLine = gLines[0]
    document.querySelector(".meme-text").value = gCurrTextLine.text;
}