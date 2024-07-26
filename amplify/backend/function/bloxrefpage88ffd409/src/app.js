/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// my imports
const mysql = require('mysql2');

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/api', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

// app.get('/api/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'get call succeed!', url: req.url});
// });

// Middleware to validate API key
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
      return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

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
      console.log(`Data retrieved for user ${id}`);
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
      console.log(`Data retrieved for user ${id}`);
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
      console.log(`Data retrieved for user ${id}`);
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
      console.log(`Data retrieved for user ${id}`);
  });
});

/****************************
* Example post method *
****************************/

app.post('/api', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

// app.post('/api/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'post call succeed!', url: req.url, body: req.body})
// });

// Secure POST endpoints with API key validation middleware
app.post('/api/addUser', validateApiKey, (req, res) => {
  const { id, referralCode } = req.body;
  console.log(`ID: ${id} ReferralCode: ${referralCode}`);
  if (!id) {
      return res.status(400).json({ error: "ID required" });
  }

  const code = referralCode ? referralCode : "";

  console.log(`ID: ${id} ReferralCode: ${referralCode}`);

  pool.query('CALL addUser(?, ?, ?)', [id, id, code], (error, results) => {
      if (error) {
          return res.status(500).json({ error: error.message });
      }
      console.log("User added successfully");
      res.status(201).json({ message: "User added successfully" });
  });
});

// Combined API endpoint to set a referral code and deactivate old code if provided
app.post('/api/setReferralCode', validateApiKey, (req, res) => {
  const { id, oldReferralCode, newReferralCode } = req.body;

  if (!id || !newReferralCode) {
      return res.status(400).json({ error: "ID and newReferralCode required" });
  }

  const deactivateOldCode = oldReferralCode ? new Promise((resolve, reject) => {
      pool.query('UPDATE codes SET code_active = FALSE WHERE referral_code = ?', [oldReferralCode], (error, results) => {
          if (error) {
              reject(error);
          } else {
              resolve();
          }
      });
  }) : Promise.resolve();

  deactivateOldCode
      .then(() => {
          pool.query('CALL setReferralCode(?, ?, TRUE)', [id, newReferralCode], (error, results) => {
              if (error) {
                  return res.status(500).json({ error: error.message });
              }
              res.status(200).json({ message: "Referral code updated successfully" });
          });
      })
      .catch((error) => {
          res.status(500).json({ error: error.message });
      });
});

/****************************
* Example put method *
****************************/

app.put('/api', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/api/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/api', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/api/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
