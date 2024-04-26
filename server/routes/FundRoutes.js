const express = require("express");

const {
  getFunds,
  createFund,
  donate,
  getFundsByUserId,
  getUserTransactionHistory,
} = require("../controllers/FundController");

const router = express.Router();

router.get("/get-funds", getFunds);
router.get("/get-user-funds/:id", getFundsByUserId);
router.get("/get-user-transactions/:id", getUserTransactionHistory);

router.post("/donate", donate);
router.post("/create-fund", createFund);

module.exports = router;
