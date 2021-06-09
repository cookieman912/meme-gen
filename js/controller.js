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
    document.querySelector('main').classList.add('hidden')
    document.querySelector('.generator-container').classList.remove('hidden')
    gCurrImg = new Image();
    gCurrImg.src = source;
    renderImg(gCurrImg);
    drawText('type in your meme!', 150, 20)

}

function loadImage(topTextValue) {
    renderImg(gCurrImg);
    drawText(topTextValue, 150, 20)

}

function renderMemes() {
    var strHtmls = '<ul>';
    gImgs.forEach(img => {
        strHtmls += `<li><img onclick="loadInitialImage('${img.id}')" id=${img.id} src="${img.url}" alt=""></li>`
    })
    strHtmls += `</ul>`
    document.querySelector('.template-container').innerHTML = strHtmls
    console.log(strHtmls);

}

function renderImg() {
    gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function inputTyped(el) {
    console.dir(el)
    clearCanvas();
    loadImage(el.value)

}

function drawText(text, x, y) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = '20px IMPACT'
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    loadImage()

}