import 'dotenv/config';
import { init } from '@airstack/node';
import express from 'express';

init(process.env.AIRSTACK_API_KEY, 'dev');

const app = express();
const port = process.env.PORT || 3000;

app.post('/send', (_req, res) => {
  res.send('Express + TypeScript Server');
});

app.get('/nfts', (_req, res) => {
  res.send('Express + TypeScript Server');
});

app.get('/poaps', (_req, res) => {
  res.send('Express + TypeScript Server');
});

app.get('/farcaster', (_req, res) => {
  console.log(_req.body, _req.headers);
  res.send('Farcaster');
});

app.get('/lens', (_req, res) => {
  res.send('Lens');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
