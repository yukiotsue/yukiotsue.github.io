document.getElementById('uploadButton').addEventListener('click', () => document.getElementById('upload').click());
document.getElementById('upload').addEventListener('change', handleImageUpload);

const imageCanvas = document.getElementById('imageCanvas');
const drawingCanvas = document.getElementById('drawingCanvas');
const imageCtx = imageCanvas.getContext('2d');
const drawingCtx = drawingCanvas.getContext('2d');

let drawing = false;
let drawingHistory = [];
let currentPath = [];

drawingCanvas.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
        drawing = true;
        currentPath = [{ x: e.offsetX, y: e.offsetY }];
        drawingCtx.beginPath();
        drawingCtx.moveTo(e.offsetX, e.offsetY);
    }
});
drawingCanvas.addEventListener('mouseup', () => {
    if (drawing) {
        drawing = false;
        drawingHistory.push(currentPath);
        fillCurrentPath(); // パスを閉じて塗りつぶす
    }
});
drawingCanvas.addEventListener('mousemove', draw);
drawingCanvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    undoLastLine();
});

function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const windowWidth = window.innerWidth;
            const scaleFactor = windowWidth / img.width;
            const scaledWidth = img.width * scaleFactor;
            const scaledHeight = img.height * scaleFactor;
            adjustCanvasSize(scaledWidth, scaledHeight);
            imageCtx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
        }
        img.src = e.target.result;
    }
    reader.readAsDataURL(file);
}

function adjustCanvasSize(width, height) {
    imageCanvas.width = width;
    imageCanvas.height = height;
    drawingCanvas.width = width;
    drawingCanvas.height = height;
    drawingCtx.clearRect(0, 0, width, height);
    drawingCtx.strokeStyle = 'red';
    drawingCtx.fillStyle = 'rgba(255, 0, 0, 0.8)'; // 不透明度を高くする
    drawingCtx.lineWidth = 5;
    redrawHistory();
}

function draw(event) {
    if (!drawing) return;
    const x = event.offsetX;
    const y = event.offsetY;
    currentPath.push({ x, y });
    drawingCtx.lineTo(x, y);
    drawingCtx.stroke();
}

function fillCurrentPath() {
    drawingCtx.closePath(); // パスを閉じる
    drawingCtx.fill(); // 塗りつぶす
    drawingCtx.stroke(); // 線を描く
}

function undoLastLine() {
    if (drawingHistory.length > 0) {
        drawingHistory.pop();
        redrawHistory();
    }
}

function redrawHistory() {
    drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    for (const path of drawingHistory) {
        drawingCtx.beginPath();
        drawingCtx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
            drawingCtx.lineTo(path[i].x, path[i].y);
        }
        drawingCtx.closePath(); // パスを閉じる
        drawingCtx.fill(); // 塗りつぶす
        drawingCtx.stroke(); // 線を描く
    }
}
