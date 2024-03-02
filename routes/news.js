const express = require("express");

const { getNews, search } = require("../controllers/news.js");

const route = express.Router();

route.post("/get", getNews);
route.post("/search", search);

module.exports = route;
