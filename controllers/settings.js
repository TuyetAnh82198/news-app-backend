const UserModel = require("../models/User.js");

const update = async (req, res) => {
  try {
    await UserModel.updateOne(
      {
        username: req.body.username,
      },
      {
        newsPerPage: req.body.newsPerPage,
        category: req.body.category,
      }
    );
    const user = await UserModel.findOne({
      username: req.body.username,
    });
    user.pass = undefined;
    req.session.user = user;
    return res.status(200).json({ message: "Saved!" });
  } catch (err) {
    return res.status(400).json({ err: "server-error" });
  }
};

module.exports = { update };
