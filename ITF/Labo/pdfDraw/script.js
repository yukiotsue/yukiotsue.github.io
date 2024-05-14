document.getElementById('uploadButton').addEventListener('click', () => document.getElementById('upload').click());
document.getElementById('upload').addEventListener('change', handleZipUpload);
document.getElementById('prevButton').addEventListener('click', showPrevImage);
document.getElementById('nextButton').addEventListener('click', showNextImage);

const imageNameElement = document.getElementById('imageName');
const imageCanvas = document.getElementById('imageCanvas');
const drawingCanvas = document.getElementById('drawingCanvas');
const imageCtx = imageCanvas.getContext('2d');
const drawingCtx = drawingCanvas.getContext('2d');

let currentImageIndex = 0;
let images = [];

function handleZipUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            JSZip.loadAsync(e.target.result).then((zip) => {
                const zipEntries = [];
                zip.forEach((relativePath, zipEntry) => {
                    if (zipEntry.name.match(/\.(jpg|jpeg|png)$/i)) {
                        zipEntries.push(zipEntry);
                    }
                });
                zipEntries.sort((a, b) => a.name.localeCompare(b.name));
                zipEntries.forEach((zipEntry) => {
                    zipEntry.async('blob').then((blob) => {
                        const img = new Image();
                        img.src = URL.createObjectURL(blob);
                        img.onload = function() {
                            const windowWidth = window.innerWidth;
                            const scaleFactor = (windowWidth * 0.6) / img.width;
                            const scaledWidth = img.width * scaleFactor;
                            const scaledHeight = img.height * scaleFactor;

                            images.push({
                                name: zipEntry.name,
                                img: img,
                                scaledWidth: scaledWidth,
                                scaledHeight: scaledHeight,
                                drawingHistory: []
                            });

                            if (images.length === 1) {
                                displayImage(0);
                            }
                        }
                    });
                });
            });
        };
        reader.readAsArrayBuffer(file);
    }
}

function displayImage(index) {
    if (index >= 0 && index < images.length) {
        currentImageIndex = index;
        const img = images[index].img;
        const scaledWidth = images[index].scaledWidth;
        const scaledHeight = images[index].scaledHeight;

        imageCanvas.width = scaledWidth;
        imageCanvas.height = scaledHeight;
        drawingCanvas.width = scaledWidth;
        drawingCanvas.height = scaledHeight;

        imageCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
        imageCtx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

        drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
        drawingCtx.strokeStyle = 'red';
        drawingCtx.fillStyle = 'rgba(255, 0, 0, 0.8)';
        drawingCtx.lineWidth = 5;

        imageNameElement.textContent = images[index].name; // 画像の名前を表示
        redrawHistory();
    }
}

function showPrevImage() {
    if (currentImageIndex > 0) {
        displayImage(currentImageIndex - 1);
    }
}

function showNextImage() {
    if (currentImageIndex < images.length - 1) {
        displayImage(currentImageIndex + 1);
    }
}

let drawing = false;
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
        images[currentImageIndex].drawingHistory.push(currentPath);
        fillCurrentPath();
    }
});
drawingCanvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    const x = e.offsetX;
    const y = e.offsetY;
    currentPath.push({ x, y });
    drawingCtx.lineTo(x, y);
    drawingCtx.stroke();
});
drawingCanvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    undoLastLine();
});

function fillCurrentPath() {
    drawingCtx.closePath();
    drawingCtx.fill();
    drawingCtx.stroke();
}

function undoLastLine() {
    if (images[currentImageIndex].drawingHistory.length > 0) {
        images[currentImageIndex].drawingHistory.pop();
        redrawHistory();
    }
}

function redrawHistory() {
    drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    for (const path of images[currentImageIndex].drawingHistory) {
        drawingCtx.beginPath();
        drawingCtx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
            drawingCtx.lineTo(path[i].x, path[i].y);
        }
        drawingCtx.closePath();
        drawingCtx.fill();
        drawingCtx.stroke();
    }
}
