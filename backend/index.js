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

// API endpoint to add a user
app.post('/api/addUser', (req, res) => {
    const { id, referralCode } = req.body;

    if (!id) {
        return res.status(500).json({ error: "ID required" });
    }

    const code = referralCode ? referralCode : "";

    pool.query('CALL addUser(?, ?, ?)', [id, id, code], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json({ message: "User added successfully" });
    });
});

// API endpoint to set a referral code
app.post('/api/setReferralCode', (req, res) => {
    const { id, oldReferralCode, newReferralCode } = req.body;

    if (!id || !newReferralCode) {
        return res.status(500).json({ error: "ID and newReferralCode required" });
    }

    if (oldReferralCode) {
        pool.query('UPDATE codes SET code_active = FALSE WHERE referral_code = ?', [id], (error, results) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            // res.json({ message: "Old Code deactivated" });
        });
    }

    pool.query('CALL setReferralCode(?, ?, TRUE)', [id, newReferralCode], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json({ message: "Referral code updated successfully" });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
