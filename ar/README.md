# MindAR Multi-Marker Sample

MindAR を使い、3 種類のイメージターゲットを同時にトラッキングするためのサンプル Web アプリです。  
`index.html` をブラウザで開くと、3 つのターゲットそれぞれの上にカラーボックスとラベルが表示されます。

## セットアップ

```bash
npm install
npm run generate:targets   # markers/*.png から multi-targets.mind を生成
npm run serve              # http://127.0.0.1:8080 を自動で開きます
```

> コンパイラは Node.js 上で TensorFlow.js を利用します。最初の実行には 10〜20 秒ほどかかります。

## マーカー画像

- `markers/marker1.png`：同心円パターン
- `markers/marker2.png`：クロスパターン
- `markers/marker3.png`：斜めストライプ

ページ内のダウンロードリンクからも入手できます。  
印刷するか、別デバイスの画面に表示してカメラで読み取ってください。

## 仕組みの概要

- `scripts/generate-targets.js` が `OfflineCompiler` を使って `assets/multi-targets.mind` を生成します。
- `main.js` で MindAR の `MindARThree` を初期化し、3 つの anchor を追加しています。
- 各 anchor に対して Three.js のメッシュ（回転するボックス、台座、ラベル）を配置しています。
- `maxTrack: 3` を指定しているため、3 マーカーを同時にトラッキングできます。

## GitHub Pages での公開

- `index.html`・`main.js`・`style.css`・`assets/` をリポジトリ直下に配置しているため、`https://<ユーザー名>.github.io/ar/` でそのまま動作します。
- 更新後に反映されない場合は、GitHub Pages 側のキャッシュをクリアするためにブラウザのハードリロードを試してください（macOS: `Cmd + Shift + R`、Windows: `Ctrl + Shift + R`）。

## カスタマイズ

1. `markers` ディレクトリに独自の画像を追加します（高コントラストで特徴量が多い画像推奨）。
2. `scripts/generate-targets.js` の `markers` 配列を変更します。
3. `npm run generate:targets` を実行して新しい `.mind` を作成します。
4. 必要に応じて `main.js` 内のアンカー数や表示内容を調整してください。

## 注意点

- カメラアクセスはユーザー操作が必要なため、必ず「Start AR」ボタンが押された後に開始します。
- HTTPS 環境での検証を推奨します（ローカル開発時は `http-server` の `--ssl` オプションを使用するとテスト可能です）。
- モバイル端末での実行時は、Safari（iOS）または Chrome（Android）の最新バージョンでの動作を推奨します。
