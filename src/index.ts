import express, { Request, Response } from 'express';


const app = express();
const PORT = process.env.PORT || 3000;

//外部ファイルの読み込み
const fs = require('fs').promises; // ファイルシステムモジュールの読み込み
const path = require('path');     // パス操作モジュールの読み込み

// JSONデータのファイルパスを定義
const USER_DATA_PATH = path.join(__dirname, '..', 'data', 'users.json');

console.log(USER_DATA_PATH);


app.use(express.json());
app.use(express.static("./public"));
app.set('views', './views'); //ビューのディレクトリを設定
app.use(express.urlencoded({ extended: true }));//POST通信設定

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express + TypeScript World!');
});

//ルーティングを追加
app.get('/test', (req: Request, res: Response) => {
    const data = {
        'title': 'タイトル',
        'lists': ['リスト1', 'リスト2', 'リスト2', 'リスト2']
    }
    res.render('test.ejs', data);
});


//フォームの送信
//get通信
app.get('/login', (req: Request, res: Response) => {
    res.render('test.ejs')
});
//post通信
app.post('/login', async (req: Request, res: Response) => {
    const data = {
        userId: req.body.userId,
        userPassword: req.body.userPassword
    }
    let users = [];
    //データの取得
    try {
        //データの取得
        const rawData = await fs.readFile(USER_DATA_PATH, 'utf-8');
        users = JSON.parse(rawData); //配列として登録
        users.push(data);//取得したデータを追加

        //データの保存
        const saveData = JSON.stringify(users, null, 2);//JSON形式に変換
        await fs.writeFile(USER_DATA_PATH, saveData, 'utf-8');//保存
    } catch (error) {
        console.error("登録エラー:", error);
        res.status(500).send("サーバーエラーが発生しました");
    }
    res.render('mypage.ejs', data);
});








app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

