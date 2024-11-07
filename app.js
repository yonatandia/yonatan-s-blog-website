const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const credentials = require("./credentials");

// express app
const app = express();

// connect to mongoDB
const dbURI = `mongodb+srv://${credentials.atlasUserName}:${credentials.atlasPassword}@nodetuts.g82je.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=NodeTuts`;

mongoose
  .connect(dbURI)
  .then((result) => console.log("connected to db"))
  .then((result) => app.listen(3000)) // listen for requests
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
