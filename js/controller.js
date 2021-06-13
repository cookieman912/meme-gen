'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gIsDown = false;

function init() {
    renderMemes();
    getLocalMemes()
    console.log(gMemes);
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
    addListeners();
    loadImage(true)

}

function loadImage(withBoxes) {
    renderImg(gCurrImg);
    gLines.forEach((line) => {
        drawText(line)
    })
    if (withBoxes && gCurrTextLine) drawBox(gCurrTextLine.x, gCurrTextLine.y);
    if (gCurrTextLine) drawText(gCurrTextLine);

}





function renderMemes() {
    let strSearch = document.querySelector('.searchbar').value
    strSearch.toLowerCase();

    let strHtmls = '';
    gImgs.forEach(img => {
        if (img.keywords.some(keyword => keyword.includes(strSearch)))
            strHtmls += `<div class="meme-grid-item"><img onclick="loadInitialImage('${img.id}')" id=${img.id} src="${img.url}" alt=""></div>`
    })
    document.querySelector('.template-container').innerHTML = strHtmls


}

function renderSavedMemes() {
    let strHtmls = '';
    gMemes.forEach(meme => {
        console.log(meme)
        console.log(meme.img.src);
        strHtmls += `<div class="meme-grid-item"><img onclick="loadSavedMeme('${meme.id}')" src="${meme.img.src}" alt=""></div>`

    })
    document.querySelector('.template-container').innerHTML = strHtmls
}

function renderImg() {
    gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function inputTyped(el) {
    gCurrTextLine.text = el.value;
    gLines.forEach((line) => {
        clearCanvas()

    });
    loadImage(true);

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
    gCtx.rect(x - 180, y - (gCurrTextLine.fontSize * 1.2), 350, (gCurrTextLine.fontSize * 1.2))
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}

function switchLines() {
    if (gLines.length <= 1) return;
    if (gCurrTextLine.id === gTextId - 1) {
        gCurrTextLine = gLines[0];

    } else {
        let currIdx = gLines.findIndex(line => gCurrTextLine.id === line.id)
        gCurrTextLine = gLines[currIdx + 1];

    }
    document.querySelector(".meme-text").value = gCurrTextLine.text;
    loadImage(true);
}

function changeFontSize(changeValue) {
    gCurrTextLine.fontSize += changeValue;
    loadImage(true);
}

function changeTextLocation(changeValue) {
    gCurrTextLine.y += changeValue
    loadImage(true);

}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}


function clearCanvasPart(partValue) {
    gCtx.clearRect(0, partValue, gElCanvas.width, partValue + 25)

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

function onSaveMeme() {
    let currMeme = buildMeme();
    gMemes.push(currMeme);
    saveMemes();
}




function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}



function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        loadImage(true)
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    console.log('down');
    const pos = getEvPos(ev)
    if (isTextClicked(pos)) {
        document.body.style.cursor = 'grabbing'
        gIsDown = true;
    }

}

function onMove(ev) {
    if (gIsDown) {
        const pos = getEvPos(ev)
        gCurrTextLine.x = pos.x
        gCurrTextLine.y = pos.y
        loadImage(true);
    }

}

function onUp() {
    console.log('up!');
    gIsDown = false;
    document.body.style.cursor = 'grab'

}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    // document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = function(event) {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
        gCurrImg = img
        loadImage(false)
    }
    reader.readAsDataURL(ev.target.files[0])
}