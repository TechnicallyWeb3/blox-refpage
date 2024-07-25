require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 4001;

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// API endpoint to get data from the database
app.get('/api/userData', (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(500).json({ error: "ID required use ...userData?id=[blox-user-id]" });
    }
    pool.query('CALL getUserData(?)', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (results[0].length === 0) {
            return res.status(500).json({ error: "user not found" });
        }
        if (results[0].length > 1) {
            return res.status(500).json({ error: "duplicate user error" });
        }


        res.json(results[0][0]);
        console.log(res);
    });
});

// API endpoint to get data from the database
app.get('/api/referralData', (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(500).json({ error: "ID required use ...referralData?id=[blox-user-id]" });
    }

    pool.query('CALL getReferralData(?)', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (results[0].length === 0) {
            return res.status(500).json({ error: "user not found" });
        }
        if (results[0].length > 1) {
            return res.status(500).json({ error: "duplicate user error" });
        }

        res.json(results[0][0]);
        console.log(res);
    });
});

app.get('/api/referralCodeData', (req, res) => {
    const { id } = req.query;
    
    if (!id) {
        return res.status(500).json({ error: "ID required use ...referralCodeData?id=[blox-user-id]" });
    }

    pool.query('CALL getReferralCodeData(?)', [id], (error, results) => {

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (results[0].length === 0) {
            return res.status(500).json({ error: "no referral codes found" });
        }

        // if (results[0].length > 1) {
        //     return res.status(500).json({ error: "duplicate user error" });
        // }

        res.json(results[0][0]);
        console.log(res);
    });
});

app.get('/api/pointsData', (req, res) => {
    const { id } = req.query;
    
    if (!id) {
        return res.status(500).json({ error: "ID required use ...pointsData?id=[blox-user-id]" });
    }

    pool.query('CALL getPointsData(?)', [id], (error, results) => {

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        // if (results[0].length === 0) {
        //     return res.status(500).json({ error: "no points found" });
        // }

        // if (results[0].length > 1) {
        //     return res.status(500).json({ error: "duplicate user error" });
        // }

        res.json(results[0]);
        console.log(res);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
