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
//Get Article для авторизованных
router.post("/getUserArticle", verifyToken, ArticleController.getUserArticle);
router.post("/getMyArticles", verifyToken, ArticleController.getMyArticles);
//Манипуляции с Откликами
router.post("/createRequest", verifyToken, ArticleController.createRequest);
router.post("/updateRequest", verifyToken, ArticleController.updateRequest);
router.post("/deleteRequest", verifyToken, ArticleController.deleteRequest);
router.post("/deleteExecutor", verifyToken, ArticleController.deleteExecutor);
router.post("/setExecutor", verifyToken, ArticleController.setExecutor);
//Изменения статусов
router.post("/deleteArticle", verifyToken, ArticleController.deleteArticle);
router.post("/restoreArticle", verifyToken, ArticleController.restoreArticle);
router.post("/publicArticle", verifyToken, ArticleController.publicArticle);
router.post("/onWayArticle", verifyToken, ArticleController.onWayArticle);
router.post("/completeArticle", verifyToken, ArticleController.completeArticle);
router.post("/cancelArticle", verifyToken, ArticleController.cancelArticle);
router.post("/equipArticle", verifyToken, ArticleController.equipArticle);
router.post("/draftArticle", verifyToken, ArticleController.draftArticle);
//Reviews
router.post("/saveReview", verifyToken, ArticleController.saveReview);
module.exports = router;
