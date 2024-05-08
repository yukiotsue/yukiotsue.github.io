// 画像ファイルを選択するためのイベントリスナーを設定
document.getElementById('imageInput').addEventListener('change', handleImages, false);

// 画像ファイルの処理を行う関数
async function handleImages(event) {
  const files = event.target.files;
  const output = document.getElementById('output');
  output.innerHTML = ''; // 前の結果をクリア
  for (const file of files) {
    const imageUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = async () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // 64マスに分割（8x8のグリッド）
      const gridSize = 8;
      const tileWidth = canvas.width / gridSize;
      const tileHeight = canvas.height / gridSize;
      let totalRedCount = 0;

      for (let i = 0; i < gridSize; i++) {
        const row = document.createElement('div'); // 新しい行を作成
        row.style.display = 'flex';

        for (let j = 0; j < gridSize; j++) {
          const tileCanvas = document.createElement('canvas');
          const tileCtx = tileCanvas.getContext('2d');
          tileCanvas.width = tileWidth;
          tileCanvas.height = tileHeight;

          // 各タイルの画像データを取得して描画
          tileCtx.drawImage(canvas, j * tileWidth, i * tileHeight, tileWidth, tileHeight, 0, 0, tileWidth, tileHeight);
          const pixelData = ctx.getImageData(j * tileWidth + tileWidth / 2, i * tileHeight + tileHeight / 2, 1, 1).data;
          
          // 赤色のピクセルをカウント
          if (isRed(pixelData)) {
            totalRedCount++;
            // 赤色ピクセルを含むタイルに白い円を描画
            drawCircle(tileCtx, tileWidth, tileHeight);
          }

          // タイルごとの画像を表示
          const imgTag = document.createElement('img');
          imgTag.src = tileCanvas.toDataURL();
          imgTag.style.width = '50px'; // サイズを小さく設定
          imgTag.style.height = '50px';
          imgTag.style.margin = '2px';
          row.appendChild(imgTag);
        }
        output.appendChild(row);
      }

      // 全体の赤色ピクセル数を表示
      const resultText = document.createTextNode(`画像 ${file.name} - 全体の赤色ピクセル数: ${totalRedCount}`);
      output.appendChild(resultText);
      output.appendChild(document.createElement('br'));

      URL.revokeObjectURL(imageUrl);
    };
    img.src = imageUrl;
  }
}

// 赤色を判定する関数
function isRed(data) {
  return data[0] > 100 && data[0] > data[1] * 1.2 && data[0] > data[2] * 1.2;
}

// タイルに白い円を描画する関数
function drawCircle(ctx, width, height) {
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, width / 4, 0, 2 * Math.PI, false);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 5;  // 線の太さを5に設定
  ctx.stroke();
}
