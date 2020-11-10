/**
 * server.js
 * Author: Vasilev Egor
 */
"use strict";

const express = require("express");
const adminPanel = require("./controllers/AdminController");
const formidableMiddleware = require("express-formidable");

// Use Express as our web server
const app = express();

app.use("/admin", formidableMiddleware(), adminPanel);
// Parse JSON

// Starts the HYPER10N server
async function startServer() {
  // Start the Express server
  if (process.env.MODE == "development") {
    const http = require("http").createServer(app);
    http.listen(process.env.PORT, () => {
      
    });
  }

  if (process.env.MODE == "production") {
    const fs = require("fs");
    var sslCerts = {
      key: fs.readFileSync("/etc/letsencrypt/live/pogrooz.ru/privkey.pem"),
      cert: fs.readFileSync("/etc/letsencrypt/live/pogrooz.ru/fullchain.pem"),
    };
    const https = require("https").createServer(sslCerts, app);
    https.listen(8080);
  }
}

startServer();
