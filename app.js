const express = require('express'); // expressモジュールを読み込む
const multer = require('multer'); // multerモジュールを読み込む
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express(); // expressアプリを生成する
app.use(multer().none()); // multerでブラウザから送信されたデータを解釈する
app.use(express.static('web')); // webフォルダの中身を公開する
app.use(bodyParser.json());

// http://localhost:3000/api/v1/list にアクセスしてきたときに
// TODOリストを返す
app.get('/api/v1/list', (req, res) => {
    // JSONを送信する
    const fs = require('fs');

// ファイルのパス
const filePath = 'todolist.json';

// ファイルを非同期で読み込む
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }

    try {
        // JSONデータをオブジェクトにパース
        const hoo = JSON.parse(data)

        res.json(hoo);
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).json({ error: 'Internal Server Errorだよ！' });
    }
});

});

// http://localhost:3000/api/v1/add にデータを送信してきたときに
// TODOリストに項目を追加する
app.post('/api/v1/add', (req, res) => {
    console.log(req.body);
    const fileName = 'todolist.json';

    // ファイルを同期的に読み込む
    let jsonData = [];

  // ファイルを同期的に読み込む
  try {
    const data = fs.readFileSync(fileName, 'utf8');

    // 読み込んだデータが空でない場合、JSONデータとしてパース
    if (data.trim() !== '') {
      jsonData = JSON.parse(data);
    }
  } catch (readError) {
    console.error('ファイル読み込みエラー:', readError);
    res.status(500).send('エラーが発生しました。');
    return;
  }

  // req.bodyのデータが空でないかチェック
  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    // req.bodyが空の場合の処理
    res.status(400).send('リクエストのボディが空です。');
  } else {
    // req.bodyのデータをJSONデータに追加
    jsonData.push(req.body);

    // 更新されたJSONデータをファイルに書き込む
    try {
      fs.writeFileSync(fileName, JSON.stringify(jsonData));
      //res.send('データが追加されました。');
    } catch (writeError) {
      console.error('ファイル書き込みエラー:', writeError);
      res.status(500).send('エラーが発生しました。');
    }
  }
  });

// ポート3000でサーバを立てる
app.listen(3000, () => console.log('Listening on port 3000'));
