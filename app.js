import { config } from 'dotenv';
import express from 'express';
import connection from './connect.js';

config();

const app = express();
const port = 3000;

app.get('/consulta-dados', async (req, res) => {
  try {
    const connect = await connection();
    const [rows] = await connect.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error('Erro ao consultar ou inserir dados:', err);
    res.status(500).send('Erro ao consultar ou inserir dados.');
  }
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
