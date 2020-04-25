/**
 * server.js
 * Author: Roman Shuvalov
 */
'use strict';

const setup = require('./setup');
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const path = require('path');
const historyApiFallback = require('connect-history-api-fallback');
// const errors = require('./middleware/errors');
const authRoutes = require('./routes/auth');

// Use Express as our web server
const app = express();

app
  // Parse JSON
  .use(bodyParser.json())
  // Cors
  .use(cors())
  // Enable files upload
  .use(fileUpload({
    createParentPath: true
  }))
  .use(morgan('dev'))
  // Enable routes
  .use('/auth', authRoutes)
  // Serve static files
  .use(express.static(path.join(__dirname, '../client')))
  // Enable history API
  .use(historyApiFallback())
  // Error middleware
//   .use(errors);


// Starts the HYPER10N server
async function startServer() {
  // Check if our database is setup with the right tables
  try {
    const ready = await setup.checkTables();
    if (!ready) {
      console.log('⚠️ No database tables found. Run `npm run setup` before starting ' + 'the server.\n');
      process.exit(0);
    }
  } catch (e) {
    console.log(e);
  }

  // Start the Express server
  app.listen(process.env.PORT, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(
      `⚡️ HYPER10N server started: http://localhost:${process.env.PORT}`
    );
  });
}

// Run the async function to start our server
startServer();