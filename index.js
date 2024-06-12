import { config } from 'dotenv';
import express from 'express';
import mysql from 'mysql2';

config();

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

function connectToDatabase() {
  db.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      process.exit(1);
    }
    console.log('Conectado ao banco de dados.');
    
    db.query('SELECT COUNT(*) AS count FROM users', (err, results) => {
      if (err) {
        console.error('Erro ao verificar dados na tabela:', err);
        process.exit(1);
      }
      if (results[0].count === 0) {
        const insertQuery = 'INSERT INTO users (name, email) VALUES ?';
        const users = [
          ['Alice', 'alice@example.com'],
          ['Bob', 'bob@example.com']
        ];
        db.query(insertQuery, [users], (err, result) => {
          if (err) {
            console.error('Erro ao inserir dados:', err);
            process.exit(1);
          }
          console.log('Dados inseridos com sucesso:', result);
        });
      } else {
        console.log('Dados já existentes na tabela.');
      }
    });
  });
};

connectToDatabase();

app.get('/consulta-dados', (req, res) => {
  db.query('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error('Erro ao consultar dados:', err);
      res.status(500).send('Erro ao consultar dados.');
      return;
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
