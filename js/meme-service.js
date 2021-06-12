'use strict'
var gImgs = [{ id: '1', url: 'img/1.jpg', keywords: ['trump', 'donald'], }, { id: '2', url: 'img/2.jpg', keywords: ['dogs', 'puppies'] }, { id: '3', url: 'img/3.jpg', keywords: ['dogs', 'puppies', 'baby'] },
    { id: '4', url: 'img/4.jpg', keywords: ['cat', 'laptop'] },
    { id: '5', url: 'img/5.jpg', keywords: ['success', 'kid', 'baby'] }, { id: '6', url: 'img/6.jpg', keywords: ['aliens', 'history channel'] }, { id: '7', url: 'img/7.jpg', keywords: ['baby', 'kid', 'boy'] },
    { id: '8', url: 'img/8.jpg', keywords: ['willi wonka', 'charlie', 'chocolate factory'] }, { id: '9', url: 'img/9.jpg', keywords: ['baby', 'evil', 'sinister'] }, { id: '10', url: 'img/10.jpg', keywords: ['barack', 'obama'] },
    { id: '11', url: 'img/11.jpg', keywords: ['kissing'] }, { id: '12', url: 'img/12.jpg', keywords: ['what would you do'] }, { id: '13', url: 'img/13.jpg', keywords: ['leonardo dicaprio', 'great gatsby'] },
    { id: '14', url: 'img/14.jpg', keywords: ['morpheus', 'matrix', 'what if i told you'] }, { id: '15', url: 'img/15.jpg', keywords: ['boromir', 'mordor', 'one does not simply'] }, { id: '16', url: 'img/16.jpg', keywords: ['picard', 'star trek'] },
    { id: '17', url: 'img/17.jpg', keywords: ['vladimir putin'] }, { id: '18', url: 'img/18.jpg', keywords: ['toy story', 'everywhere', 'buzz lightyear'] },
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
var gLines = [_buildLine(20), _buildLine(380)]
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
    loadImage(true);
}



function downloadMeme(elLink) {
    loadImage(false)
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
    loadImage(true)
}


function resizeCanvas() {
    function resizeCanvas() {
        var elContainer = document.querySelector('.generator')
        gElCanvas.width = elContainer.offsetWidth
        gElCanvas.height = elContainer.offsetHeight
    }
}

function removeLine() {

    if (!gLines.length === 0) return;
    let deletedline = gCurrTextLine;
    if (gLines.length > 1) switchLines();
    else {
        document.querySelector(".meme-text").value = '';
        console.log(gLines);
        console.log('null!');
        gCurrTextLine = null
    }
    let deletedIdx = gLines.findIndex(line => deletedline.id === line.id)
    gLines.splice(deletedIdx, 1)
    loadImage(true);



}

function isTextClicked(clickedPos) {
    console.log(clickedPos);
    return ((clickedPos.y > gCurrTextLine.y - 40 && clickedPos.y < gCurrTextLine.y + 20) &&
        (clickedPos.x > gCurrTextLine.x - 150 && clickedPos.x < gCurrTextLine.x + 100))
}

function _buildLine(y) {
    var newLine = { text: '', fontSize: 16, y, x: 200, id: gTextId, isDrag: false }
    gTextId++;
    return newLine;
}