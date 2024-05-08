document.getElementById('upload').addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var img = new Image();
            img.onload = function() {
                var canvas = document.getElementById('canvas');
                var ctx = canvas.getContext('2d');
                var canvasWidth = canvas.width;
                var canvasHeight = canvas.height;

                // 元画像をcanvasに描画
                ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

                // canvasから画像データを取得
                var imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
                var data = imageData.data;

                // 色のカウント用オブジェクト
                var colorCounts = {};

                // 各ピクセルを16色に減色し、色をカウント
                for (var i = 0; i < data.length; i += 4) {
                    var r = Math.floor(data[i] / 64) * 64;
                    var g = Math.floor(data[i + 1] / 64) * 64;
                    var b = Math.floor(data[i + 2] / 64) * 64;
                    var color = `rgb(${r}, ${g}, ${b})`;

                    data[i] = r;     // Red
                    data[i + 1] = g; // Green
                    data[i + 2] = b; // Blue

                    // 色のカウント
                    if (colorCounts[color]) {
                        colorCounts[color]++;
                    } else {
                        colorCounts[color] = 1;
                    }
                }

                // 減色した画像データをcanvasに再描画
                ctx.putImageData(imageData, 0, 0);

                // 色のカウントをログに出力
                console.log(colorCounts);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    }
});