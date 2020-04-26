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


app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const sslCerts = {
    key: fs.readFileSync("/etc/letsencrypt/live/pogrooz.ru/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/pogrooz.ru/fullchain.pem")
}

https.createServer(sslCerts, app).listen(443);

// Redirect from http port 80 to https
var http = require('http');
http.createServer(function (req, res) {
    res.redirect(`https://${req.host}${req.url}`);
    return;
}).listen(80);