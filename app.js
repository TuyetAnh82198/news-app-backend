const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@users.nyp2s8t.mongodb.net/?retryWrites=true&w=majority`,
  databaseName: "test",
  collection: "sessions",
});
const compression = require("compression");

const users = require("./routes/users.js");
const todo = require("./routes/todo.js");
const settings = require("./routes/settings.js");

const app = express();

app.use(compression());
app.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
    },
  })
);

app.use("/users", users);
app.use("/todo", todo);
app.use("/settings", settings);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@users.nyp2s8t.mongodb.net/?retryWrites=true&w=majority`
  )
  .then((result) => {
    // console.log(result);
    const io = require("./socket.js").init(
      app.listen(process.env.PORT || 5000)
    );
    io.on("connect", (socket) => {
      socket.on("disconnect", () => {});
    });
  })
  .catch((err) => console.log(err));
