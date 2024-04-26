const express = require("express");

const { login, register, getUser } = require("../controllers/UserController");
const router = express.Router();

/* POST */
router.get("/get-user/:id", getUser);

/* POST */
router.post("/register", register);
router.post("/login", login);

module.exports = router;
