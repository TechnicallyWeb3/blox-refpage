const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 4001;

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'yourUsername',
  password: 'yourPassword',
  database: 'yourDatabase'
});

// API endpoint to get data from the database
app.get('/api/data', (req, res) => {
  pool.query('SELECT * FROM yourTable', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
