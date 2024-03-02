const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const UserModel = require("../models/User.js");

//xử lý việc đăng ký của người dùng
const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errArr = [];
      errors.array().forEach((err) => errArr.push(err.msg));
      return res.status(400).json({
        errs: errArr[0],
      });
    } else {
      const existingUser = await UserModel.findOne({
        username: req.body.username,
      });
      if (existingUser) {
        return res.status(409).json({ message: "Existing user!" });
      } else {
        const newUser = new UserModel({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          username: req.body.username,
          pass: bcrypt.hashSync(req.body.pass, 8),
        });
        await newUser.save();
        return res.status(200).json({ message: "Created!" });
      }
    }
  } catch (err) {
    return res.status(400).json({ err: "server-error" });
  }
};

//xử lý việc đăng nhập của người dùng
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errArr = [];
      errors.array().forEach((err) => errArr.push(err.msg));
      return res.status(400).json({
        errs: errArr[0],
      });
    } else {
      const existingUser = await UserModel.findOne({
        username: req.body.username,
      });
      if (existingUser) {
        const correctPass = bcrypt.compareSync(
          req.body.pass,
          existingUser.pass
        );
        if (correctPass) {
          existingUser.pass = undefined;
          req.session.user = existingUser;
          return res.status(200).json({ message: "You are logged in!" });
        } else {
          return res.status(400).json({ message: "Wrong user or password!" });
        }
      } else {
        return res.status(400).json({ message: "Wrong user or password!" });
      }
    }
  } catch (err) {
    return res.status(400).json({ err: "server-error" });
  }
};

//hàm kiểm tra người dùng đã đăng nhập chưa
const checkLogin = (req, res) => {
  try {
    const loggedInUser = req.session.user;
    // console.log(loggedInUser);
    if (loggedInUser) {
      return res.status(200).json({
        firstName: loggedInUser.firstName,
        newsPerPage: loggedInUser.newsPerPage,
        category: loggedInUser.category,
        username: loggedInUser.username,
      });
    }
    return res.status(400).json({ message: "have not been logged in yet!" });
  } catch (err) {
    return res.status(400).json({ err: "server-error" });
  }
};

//hàm xử lý việc đăng xuất
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(400).json({ err: err.message });
    } else {
      res.clearCookie("connect.sid");
      return res.status(200).json({ message: "You are logged out." });
    }
  });
};

module.exports = {
  register,
  login,
  checkLogin,
  logout,
};
