var User = require("../models/user").User;
var validate = require("../models/user").validate;
var express = require("express");
var router = express.Router();

router.post("/createUser", function (req, res) {
  var error = validate(req.body).error;
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send(err);
    if (user) {
      return res.status(400).send("User already exists!");
    } else {
      user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      });
      user.save(function(err) {
        if (err) return res.status(500).send(err);
        res.send(user);
      });
    }
  });
});

router.get("/getUser/:username", function (req, res, next) {
  var username = req.params;
  User.findOne(username, function (err, userFound) {
    if (err) return next(err);
    if (!userFound) {
      return res.status(404).end();
    }
    return res.status(200).json(userFound);
  });
});

router.put("/updateUser/:id", function (req, res, next) {
  User.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    },
    { new: true, returnOriginal: false },
    function (err, userUpdated) {
      if (err) return next(err);
      if (!userUpdated) {
        return res.status(404).end();
      }
      return res.status(200).json(userUpdated);
    }
  );
});

router.delete("/deleteUser/:id", function (req, res) {
  var id = req.params.id;
  User.findByIdAndDelete(id, function (error, response) {
    if (error) {
      res
        .status(404)
        .json("User with id:" + id + " was not deleted. Something went wrong.")
        .end();
    } else {
      res.status(200).json("User with id:" + id + " deleted succesfully");
    }
  });
});

router.get("/getUsers", function (req, res) {
  User.find({}, function (error, users) {
    var userMap = {};
    users.forEach(function (user) {
      userMap[user._id] = user;
    });
    res.send(userMap);
  });
});

module.exports = router;