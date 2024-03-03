const express = require("express");

const { getNews, search } = require("../controllers/news.js");
const isAuth = require("../middleware/isAuth.js");

const route = express.Router();

route.post("/get", getNews);
route.post("/search", isAuth, search);

module.exports = route;
