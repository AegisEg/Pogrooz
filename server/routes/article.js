/**
 * user.js
 * Author: Vasilev Egor
 */
"use strict";

const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const tariffCheck = require("../middleware/tariffCheck");
const BanCheck = require("../middleware/BanCheck");
const ArticleController = require("../controllers/ArticleController");

router.post("/createArticle", verifyToken, ArticleController.createArticle);
router.post("/updateArticle", verifyToken, ArticleController.updateArticle);
router.post("/getArticles", ArticleController.getArticles);
router.post("/getArticle", ArticleController.getArticle);
//Get Article для авторизованных
router.post("/getUserArticle", verifyToken, ArticleController.getUserArticle);
router.post("/getMyArticles", verifyToken, ArticleController.getMyArticles);
//Манипуляции с Откликами
router.post(
  "/createRequest",
  verifyToken,
  tariffCheck,
  ArticleController.createRequest
);
router.post("/updateRequest", verifyToken, ArticleController.updateRequest);
router.post("/deleteRequest", verifyToken, ArticleController.deleteRequest);
router.post("/deleteExecutor", verifyToken, ArticleController.deleteExecutor);
router.post(
  "/setExecutor",
  verifyToken,
  tariffCheck,
  ArticleController.setExecutor
);
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
router.post("/getMyReviews", verifyToken, ArticleController.getMyReviews);
router.post("/getUserReviews", ArticleController.getUserReviews);
router.post("/saveReview", verifyToken, ArticleController.saveReview);
router.post(
  "/setDeliveredCargo",
  verifyToken,
  ArticleController.setDeliveredCargo
);
router.post(
  "/setRequestCancel",
  verifyToken,
  ArticleController.setRequestCancel
);
router.post("/setLocation", verifyToken, ArticleController.setLocation);
router.post("/getGeoArticles", verifyToken, ArticleController.getGeoArticles);
router.post("/requestGeolocation", verifyToken, ArticleController.requestGeolocation);
router.post(
  "/offerCargoOrder",
  verifyToken,
  BanCheck,
  ArticleController.offerCargoOrder
);
module.exports = router;
