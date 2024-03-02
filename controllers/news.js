const NewsModel = require("../models/News.js");

//hàm trả về danh sách tin tức theo danh mục
const getNews = async (req, res) => {
  try {
    const articles = await NewsModel.find({
      category: req.body.category,
    })
      .skip((req.body.page - 1) * req.body.size)
      .limit(req.body.size);
    const totalResults = await NewsModel.countDocuments({
      category: req.body.category,
    });
    return res.status(200).json({
      articles: articles,
      totalResults: totalResults,
    });
  } catch (err) {
    return res.status(400).json({ err: "server-error" });
  }
};

//hàm trả về danh sách tin tức dựa theo từ khóa tìm kiếm
const search = async (req, res) => {
  try {
    const articles = await NewsModel.find({
      title: { $regex: req.body.keyword, $options: "i" },
    })
      .skip((req.body.page - 1) * req.session.user.newsPerPage)
      .limit(req.session.user.newsPerPage);
    const totalResults = await NewsModel.countDocuments({
      title: { $regex: req.body.keyword, $options: "i" },
    });
    return res.status(200).json({
      articles: articles,
      totalResults: totalResults,
    });
  } catch (err) {
    return res.status(400).json({ err: "server-error" });
  }
};

module.exports = { getNews, search };
