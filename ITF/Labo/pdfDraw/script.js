document.getElementById('uploadButton').addEventListener('click', () => document.getElementById('upload').click());
document.getElementById('upload').addEventListener('change', handleZipUpload);
document.getElementById('prevButton').addEventListener('click', showPrevImage);
document.getElementById('nextButton').addEventListener('click', showNextImage);
document.getElementById('downloadButton').addEventListener('click', downloadDrawings);
document.getElementById('downloadLinesButton').addEventListener('click', downloadLines);

const imageNameElement = document.getElementById('imageName');
const imageCanvas = document.getElementById('imageCanvas');
const drawingCanvas = document.getElementById('drawingCanvas');
const imageCtx = imageCanvas.getContext('2d');
const drawingCtx = drawingCanvas.getContext('2d');
const canvasContainer = document.getElementById('canvasContainer');

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
                            const windowHeight = window.innerHeight;
                            const scaleFactor = (windowHeight * 0.7) / img.height;
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
        canvasContainer.style.width = `${scaledWidth}px`;
        canvasContainer.style.height = `${scaledHeight}px`;
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

function downloadDrawings() {
    const zip = new JSZip();
    let processedImages = 0;

    images.forEach((image, index) => {
        const drawingCanvas = document.createElement('canvas');
        drawingCanvas.width = image.scaledWidth;
        drawingCanvas.height = image.scaledHeight;
        const drawingCtx = drawingCanvas.getContext('2d');

        drawingCtx.drawImage(image.img, 0, 0, image.scaledWidth, image.scaledHeight);

        drawingCtx.strokeStyle = 'red';
        drawingCtx.fillStyle = 'rgba(255, 0, 0, 0.8)';
        drawingCtx.lineWidth = 5;

        image.drawingHistory.forEach((path) => {
            drawingCtx.beginPath();
            drawingCtx.moveTo(path[0].x, path[0].y);
            for (let i = 1; i < path.length; i++) {
                drawingCtx.lineTo(path[i].x, path[i].y);
            }
            drawingCtx.closePath();
            drawingCtx.fill();
            drawingCtx.stroke();
        });

        drawingCanvas.toBlob((blob) => {
            zip.file(`drawing_${index + 1}.png`, blob);
            processedImages++;

            if (processedImages === images.length) {
                zip.generateAsync({ type: 'blob' }).then((content) => {
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(content);
                    link.download = 'drawings.zip';
                    link.click();
                });
            }
        });
    });
}

function downloadLines() {
    const zip = new JSZip();
    let processedImages = 0;

    images.forEach((image, index) => {
        const lineCanvas = document.createElement('canvas');
        lineCanvas.width = image.scaledWidth;
        lineCanvas.height = image.scaledHeight;
        const lineCtx = lineCanvas.getContext('2d');

        lineCtx.strokeStyle = 'red';
        lineCtx.fillStyle = 'rgba(255, 0, 0, 0.8)';
        lineCtx.lineWidth = 5;

        image.drawingHistory.forEach((path) => {
            lineCtx.beginPath();
            lineCtx.moveTo(path[0].x, path[0].y);
            for (let i = 1; i < path.length; i++) {
                lineCtx.lineTo(path[i].x, path[i].y);
            }
            lineCtx.closePath();
            lineCtx.fill();
            lineCtx.stroke();
        });

        lineCanvas.toBlob((blob) => {
            zip.file(`line_${index + 1}.png`, blob);
            processedImages++;

            if (processedImages === images.length) {
                zip.generateAsync({ type: 'blob' }).then((content) => {
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(content);
                    link.download = 'lines.zip';
                    link.click();
                });
            }
        });
    });
}