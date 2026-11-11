import express, { Request, Response } from 'express';


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express + TypeScript World!');
});

//ルーティング /test
app.get('/test', (req: Request, res: Response) => {
    res.send('test ページです');
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
