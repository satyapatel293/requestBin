import express from 'express';
const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/satya/*', (_req, res) => {
  console.log('someone pinged here');
  res.json(_req.headers);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});