'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [{ id: '1', url: 'img/1.jpg', keywords: ['happy'] }, { id: '3', url: 'img/3.jpg', keywords: ['funny puk'] }, { id: '4', url: 'img/4.jpg', keywords: ['funny puk'] },
    { id: '5', url: 'img/5.jpg', keywords: ['funny puk'] }
];
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I never eat Falafel',
        size: 20,
        align: 'left',
        color: 'red'
    }]
}
var gLines = [{ text: '', fontSize: 16, height: 20 }, { text: '', fontSize: 16, height: 150 }, { text: '', fontSize: 16 }, { text: '', fontSize: 16 }]
var gCurrTextLine = gLines[0];
var gCurrTextLineIdx = 0;
var gElCanvas = document.querySelector('.generator')
var gCtx = gElCanvas.getContext('2d')
var gFontSize = 16;