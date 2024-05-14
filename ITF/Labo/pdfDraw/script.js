document.getElementById('uploadButton').addEventListener('click', () => document.getElementById('upload').click());
document.getElementById('upload').addEventListener('change', handleZipUpload);

const canvasContainerList = document.getElementById('canvasContainerList');
let images = [];
let drawingHistories = [];

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
                            const canvasContainer = document.createElement('div');
                            canvasContainer.className = 'canvasContainer';

                            const imageCanvas = document.createElement('canvas');
                            imageCanvas.className = 'imageCanvas';
                            const imageCtx = imageCanvas.getContext('2d');

                            const drawingCanvas = document.createElement('canvas');
                            drawingCanvas.className = 'drawingCanvas';
                            const drawingCtx = drawingCanvas.getContext('2d');

                            const windowWidth = window.innerWidth;
                            const scaleFactor = (windowWidth * 0.6) / img.width;
                            const scaledWidth = img.width * scaleFactor;
                            const scaledHeight = img.height * scaleFactor;

                            imageCanvas.width = scaledWidth;
                            imageCanvas.height = scaledHeight;
                            drawingCanvas.width = scaledWidth;
                            drawingCanvas.height = scaledHeight;

                            imageCtx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

                            drawingCtx.strokeStyle = 'red';
                            drawingCtx.fillStyle = 'rgba(255, 0, 0, 0.8)';
                            drawingCtx.lineWidth = 5;

                            canvasContainer.appendChild(imageCanvas);
                            canvasContainer.appendChild(drawingCanvas);
                            canvasContainerList.appendChild(canvasContainer);

                            images.push({name: zipEntry.name, img: img, drawingCtx: drawingCtx, drawingHistory: []});

                            drawingCanvas.addEventListener('mousedown', (e) => startDrawing(e, drawingCtx, images.length - 1));
                            drawingCanvas.addEventListener('mouseup', () => stopDrawing(images.length - 1));
                            drawingCanvas.addEventListener('mousemove', (e) => draw(e, drawingCtx));
                            drawingCanvas.addEventListener('contextmenu', (e) => undoLastLine(e, drawingCtx, images.length - 1));
                        }
                    });
                });
            });
        };
        reader.readAsArrayBuffer(file);
    }
}

let drawing = false;
let currentPath = [];

function startDrawing(event, ctx, imageIndex) {
    if (event.button === 0) {
        drawing = true;
        currentPath = [{ x: event.offsetX, y: event.offsetY }];
        ctx.beginPath();
        ctx.moveTo(event.offsetX, event.offsetY);
    }
}

function stopDrawing(imageIndex) {
    if (drawing) {
        drawing = false;
        images[imageIndex].drawingHistory.push(currentPath);
        fillCurrentPath(images[imageIndex].drawingCtx);
    }
}

function draw(event, ctx) {
    if (!drawing) return;
    const x = event.offsetX;
    const y = event.offsetY;
    currentPath.push({ x, y });
    ctx.lineTo(x, y);
    ctx.stroke();
}

function fillCurrentPath(ctx) {
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function undoLastLine(event, ctx, imageIndex) {
    event.preventDefault();
    if (images[imageIndex].drawingHistory.length > 0) {
        images[imageIndex].drawingHistory.pop();
        redrawHistory(ctx, images[imageIndex].drawingHistory);
    }
}

function redrawHistory(ctx, history) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (const path of history) {
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
            ctx.lineTo(path[i].x, path[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}
