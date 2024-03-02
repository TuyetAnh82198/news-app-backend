const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NewsModel = new Schema({
  author: { type: String, required: false },
  content: { type: String, required: false },
  desc: { type: String, required: true },
  publishedAt: { type: String, required: false },
  title: { type: String, required: true },
  url: { type: String, required: false },
  urlToImage: { type: String, required: true },
  category: { type: String, required: true },
});

module.exports = mongoose.model("news", NewsModel);
