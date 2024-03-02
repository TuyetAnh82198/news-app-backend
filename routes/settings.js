const express = require("express");

const { update } = require("../controllers/settings.js");
const isAuth = require("../middleware/isAuth.js");

const route = express.Router();

route.post("/update", update);

module.exports = route;
