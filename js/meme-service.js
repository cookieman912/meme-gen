'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [{ id: '1', url: 'img/1.jpg', keywords: ['happy'] }, { id: '2', url: 'img/2.jpg', keywords: ['funny puk'] }];
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
var gElCanvas = document.querySelector('.generator')
var gCtx = gElCanvas.getContext('2d')

function generateImages() {

}