const express = require("express");
const { getNearbyBusinesses } = require("../controllers/businessController");

const router = express.Router();

router.get("/nearby", getNearbyBusinesses);

module.exports = router;

