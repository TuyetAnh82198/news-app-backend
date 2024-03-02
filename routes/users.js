const express = require("express");
const { body } = require("express-validator");

const {
  register,
  login,
  logout,
  checkLogin,
} = require("../controllers/users.js");

const route = express.Router();

route.post(
  "/register",
  [
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("First Name cannot be empty!"),
    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("Last Name cannot be empty!"),
    body("username").trim().notEmpty().withMessage("Username cannot be empty!"),
    body("pass")
      .trim()
      .notEmpty()
      .withMessage("Password cannot be empty!")
      .isLength({ min: 8 })
      .withMessage("Password must be more than 8 characters"),
    body("confirmPass")
      .trim()
      .notEmpty()
      .withMessage("Confirm Password cannot be empty!")
      .custom((value, { req }) => {
        return value === req.body.pass;
      })
      .withMessage("Password and Confirm Password cannot be different!"),
  ],
  register
);
route.post(
  "/login",
  [
    body("username").trim().notEmpty().withMessage("Username cannot be empty!"),
    body("pass").trim().notEmpty().withMessage("Password cannot be empty!"),
  ],
  login
);
route.get("/check-login", checkLogin);
route.get("/logout", logout);

module.exports = route;
