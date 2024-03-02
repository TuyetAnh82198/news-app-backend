const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserModel = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  pass: { type: String, required: true },
  //Số bài viết trong 1 trang
  newsPerPage: { type: Number, required: true, default: 4 },
  //Danh mục của các tin tức muốn hiển thị trên bảng tin
  category: { type: String, required: true, default: "Science" },
});

module.exports = mongoose.model("user", UserModel);
