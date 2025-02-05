// resume-api/index.js
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello from Express API!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
