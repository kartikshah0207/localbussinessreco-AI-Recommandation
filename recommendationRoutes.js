const express = require("express");
const { createRecommendations } = require("../controllers/recommendationController");

const router = express.Router();

router.post("/", createRecommendations);

module.exports = router;

