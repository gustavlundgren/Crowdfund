const express = require("express");

const {
  getFunds,
  createFund,
  donate,
} = require("../controllers/FundController");

const router = express.Router();

router.get("/get-funds", getFunds);

router.post("/donate", donate);
router.post("/create-fund", createFund);

module.exports = router;
