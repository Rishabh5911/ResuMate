const express = require("express");
const authMiddleware = require("../middlewares/auth");
const {getDashboardData,getHistoryData,getDetailedAnalysis} = require("../controllers/dashboardController");

const router = express.Router();

router.get("/",authMiddleware,getDashboardData);
router.get("/history",authMiddleware,getHistoryData);
router.get("/analysis/:id", authMiddleware, getDetailedAnalysis);

module.exports = router;