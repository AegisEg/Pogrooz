/**
 * user.js
 * Author: Vasilev Egor
 */
"use strict";

const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const ArticleController = require("../controllers/ArticleController");

router.post("/createArticle", verifyToken, ArticleController.createArticle);
router.post("/updateArticle", verifyToken, ArticleController.updateArticle);
router.post("/getArticles", ArticleController.getArticles);
router.post("/getArticle", ArticleController.getArticle);
module.exports = router;
