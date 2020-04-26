const express = require('express');
const path = require('path');
const https = require("https")
const fs = require("fs")

const app = express();

/**
 * redirectHttps.js
 * Author: Euloge CALLATIN
 */
'use strict';

function redirectHttps(req, res, next) {
  // If we're in production mode and we received a request via HTTP, redirect them to HTTPS
  if (req.get('X-Forwarded-Proto') === 'http') {
    res.redirect(`https://${req.host}${req.url}`);
    return;
  }
  return next();
};

app.use(express.static(path.join(__dirname, 'build')));
app.use(redirectHttps)

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const sslCerts = {
    key: fs.readFileSync("/etc/letsencrypt/live/pogrooz.ru/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/pogrooz.ru/fullchain.pem")
}

https.createServer(sslCerts, app).listen(443);
