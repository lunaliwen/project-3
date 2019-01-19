const express = require("express");
var session = require("express-session");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

// Requiring passport as we've configured it
var passport = require("./config/passport");


// middleware for parsing body on post request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// DB stuff
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project-3");
const db = require("./models");

// Setup passport
app.use(session({ secret: "project3", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Login post route

// TODO: REMOVE OLD LOGIN ROUTE
app.post("/login", passport.authenticate("local"), function (req, res) {
  // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
  // So we're sending the user back the route to the members page because the redirect will happen on the front end
  // They won't get this or even be able to access this page if they aren't authed
  // res.json("/members");
  res.json({
    loggedIn: true,
    message: "WOOOO IT WORKED",
    username: req.user.username,
  });
});


app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});
// Route to get user info

// Route for getting some data about our user to be used client side
app.get("/user_data", function (req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({ loggedIn: false });
  }
  else {
    // Otherwise send back the user's username and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      uploads: req.user.uploads,
      username: req.user.username,
      password: req.user.password,
      userId: req.user._id,
      loggedIn: true
    });
  }
});

// All users test route
app.get("/allusers", function (req, res) {
  console.log("All users route was hit!");
  // get all users and send them back in a json blob
  db.User
    .find({})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
})

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/api/challenges/:id", function (req, res) {
  db.Challenge
    .findOne({ _id: req.params.id })
    .populate({
      path: "uploads",
      populate: { path: "user" }
    })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

app.get("/api/challenges", function (req, res) {
  db.Challenge
    .find({})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

app.post("/submit", function (req, res) {
  // Create a new Book in the database
  /// we want req.body to equal
  //////{
  // console.log(req.user);
  var upload = {

    comment: req.body.comment,
    link: req.body.link,
    user: req.body.user
  }

  db.Upload.create(upload)
    .then(function (dbUpload) {
      // console.log(dbUpload);
      // res.json(dbUpload)
      // If a Book was created successfully, find one library (there's only one) and push the new Book's _id to the Library's `books` array
      // { new: true } tells the query that we want it to return the updated Library -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query

      db.Challenge.findOneAndUpdate({ _id: req.body.challenge }, { $push: { uploads: dbUpload._id } }, { new: true }).then(function () {
        db.User.findOneAndUpdate({ _id: req.body.user }, { $push: { uploads: dbUpload._id } }, { new: true }).then(function () {

          db.Challenge
            .findOne({ _id: req.body.challenge })
            .populate({
              path: "uploads",
              populate: { path: "user" }
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        })
      })
        .catch(function (err) {
          // If an error occurs, send it back to the client
          res.json(err);
        });
    })
});

app.post("/registerSubmit", function (req, res) {
  // Create a new Book in the database
  /// we want req.body to equal
  //////{
  // console.log(req.user);
  var user = {

    username: req.body.username,
    password: req.body.password
  }

  db.User.create(user)
    .then(function (dbUser) {

      db.User.insert( { user: dbUser._id }, { username: dbUser.username}, { password: dbUser.password} , { new: true });
    })

    .then(dbModel => res.json(dbModel))

    .catch(function (err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});


app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});