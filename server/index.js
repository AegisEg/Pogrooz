/**
 * server.js
 * Author: Vasilev Egor
 */
"use strict";

const express = require("express");
const cluster = require("cluster");
const numCpus = require("os").cpus().length;
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const historyApiFallback = require("connect-history-api-fallback");
const { initSocket } = require("./controllers/SocketController");
const agenda = require("./agenta/agenta");
const adminPanel = require("./controllers/AdminController");
const formidableMiddleware = require("express-formidable");
// const errors = require('./middleware/errors');

//ENV load
const envFound = require("dotenv").config();
if (!envFound) {
  console.log(
    "⚠️  No .env file for HYPER10N found: this file contains" +
      "your Stripe API key and other secrets.\nTry copying .env.example to .env" +
      "(and make sure to include your own keys!)"
  );
  process.exit(0);
}

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const articleRoutes = require("./routes/article");
const dialogsRoutes = require("./routes/dialog");
const dialogOrderRoutes = require("./routes/dialogOrder");
const carRoutes = require("./routes/car");
const notification = require("./routes/notification");
const page = require("./routes/page");
const tariffs = require("./routes/tariffs");
const stats = require("./routes/stats");
// Use Express as our web server
const app = express();

app
  .use("/admin", formidableMiddleware(), adminPanel)
  // Parse JSON
  .use(bodyParser.json())
  // Cors
  .use(cors())
  // Enable files upload
  .use(
    fileUpload({
      createParentPath: true,
    })
  )
  .use(morgan("dev"))
  // Enable routes
  .use("/auth", authRoutes)
  .use("/api/article", articleRoutes)
  .use("/api/car", carRoutes)
  .use("/api/user", userRoutes)
  .use("/api/dialog", dialogsRoutes)
  .use("/api/dialogsOrder", dialogOrderRoutes)
  .use("/api/notification", notification)
  .use("/api/page", page)
  .use("/api/tariffs", tariffs)
  .use("/api/stats", stats)
  // Serve static files
  .use(express.static(path.join(__dirname, "../client")))
  .use("/media", express.static(path.join(__dirname, "./uploads")))
  // Enable history API
  .use(historyApiFallback());
// Error middleware
//   .use(errors);

// Starts the HYPER10N server
async function startServer() {
  // Start the Express server
  if (process.env.MODE == "development") {
    const http = require("http").createServer(app);

    const io = require("socket.io")(http);
    const redisAdapter = require("socket.io-redis");
    io.adapter(redisAdapter({ host: "localhost", port: 6379 }));
    initSocket(io);

    http.listen(process.env.PORT, () => {
      console.log(
        `⚡️ HEVACHAT server started: http://localhost:${process.env.PORT}`
      );
    });
  }

  if (process.env.MODE == "production") {
    const fs = require("fs");
    var sslCerts = {
      key: fs.readFileSync("/etc/letsencrypt/live/pogrooz.ru/privkey.pem"),
      cert: fs.readFileSync("/etc/letsencrypt/live/pogrooz.ru/fullchain.pem"),
    };
    const https = require("https").createServer(sslCerts, app);
    const io = require("socket.io")(https);
    const redisAdapter = require("socket.io-redis");
    io.adapter(redisAdapter({ host: "localhost", port: 6379 }));
    initSocket(io);
    https.listen(8080);
  }
  agenda.start();
}

//ADMIN
// if (cluster.isMaster) {
//   for (let i = 0; i < numCpus; i++) {
//     cluster.fork();
//   }
// }
// // Run the async function to start our server
// else 
startServer();
