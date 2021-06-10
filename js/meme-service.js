'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [{ id: '1', url: 'img/1.jpg', keywords: ['happy'] }, { id: '2', url: 'img/2.jpg', keywords: ['funny puk'] }, { id: '3', url: 'img/3.jpg', keywords: ['funny puk'] }, { id: '4', url: 'img/4.jpg', keywords: ['funny puk'] },
    { id: '5', url: 'img/5.jpg', keywords: ['funny puk'] }, { id: '6', url: 'img/6.jpg', keywords: ['happy'] }, { id: '7', url: 'img/7.jpg', keywords: ['happy'] },
    { id: '8', url: 'img/8.jpg', keywords: ['happy'] }, { id: '9', url: 'img/9.jpg', keywords: ['happy'] }, { id: '10', url: 'img/10.jpg', keywords: ['happy'] },
    { id: '11', url: 'img/11.jpg', keywords: ['happy'] }, { id: '12', url: 'img/12.jpg', keywords: ['happy'] }, { id: '13', url: 'img/13.jpg', keywords: ['happy'] },
    { id: '14', url: 'img/14.jpg', keywords: ['happy'] }, { id: '15', url: 'img/15.jpg', keywords: ['happy'] }, { id: '16', url: 'img/16.jpg', keywords: ['happy'] },
    { id: '17', url: 'img/17.jpg', keywords: ['happy'] }, { id: '18', url: 'img/18.jpg', keywords: ['happy'] },
];

// var gMeme = {
//     selectedImgId: 5,
//     selectedLineIdx: 0,
//     lines: [{
//         txt: 'I never eat Falafel',
//         size: 20,
//         align: 'left',
//         color: 'red'
//     }]
// }
var gTextId = 0;
var gLines = [_buildLine(20), _buildLine(130)]
var gCurrTextLine = gLines[0];
var gElCanvas = document.querySelector('.generator')
resizeCanvas();
var gCtx = gElCanvas.getContext('2d')
var gFontSize = 16;



function addLine(height) {
    if (!height) return;
    height = parseInt(height)
    let newLine = _buildLine(height)

    gLines.push(newLine)
    gCurrTextLine = newLine
    document.querySelector(".meme-text").value = gCurrTextLine.text;


}

function _buildLine(y) {
    var newLine = { text: '', fontSize: 16, y, x: 200, id: gTextId }
    gTextId++;
    console.log('after buidling', gTextId);
    return newLine;
}

function downloadMeme(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function getObjectFitSize(isContain, containerWidth, containerHeight, width, height) {
    var doRatio = width / height;
    var cRatio = containerWidth / containerHeight;
    var targetWidth = 0;
    var targetHeight = 0;
    var test = isContain ? doRatio > cRatio : doRatio < cRatio;

    if (test) {
        targetWidth = containerWidth;
        targetHeight = targetWidth / doRatio;
    } else {
        targetHeight = containerHeight;
        targetWidth = targetHeight * doRatio;
    }

    return {
        width: targetWidth,
        height: targetHeight,
        x: (containerWidth - targetWidth) / 2,
        y: (containerHeight - targetHeight) / 2
    };
}

function resizeCanvas() {
    gElCanvas.width = 400;
    gElCanvas.height = 400;
}