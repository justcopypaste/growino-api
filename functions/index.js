const express = require("express");
const cors = require("cors");
const app = express();
const nunjucks = require("nunjucks");
const db = require("./database");
const viewRoutes = require("./routes/viewRoutes");
const apiRoutes = require("./routes/apiRoutes");
const oneplayController = require("./oneplayController");
const functions = require('firebase-functions');

app.use(cors());

db.initDB();

nunjucks.configure(__dirname + "/public", {
  autoescape: true,
  express: app,
});

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.set("view engine", "njk");

// app.use("/", viewRoutes);
app.use("/api", apiRoutes);

app.get("/api/oneplay", oneplayController.get);
app.post("/api/oneplay/:function/:name", oneplayController.post);

exports.api = functions.https.onRequest(app);
