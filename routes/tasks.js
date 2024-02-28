var express = require("express");
var router = express.Router();

var Task = require("../models/task").Task;
var validate = require("../models/task").validate;

router.post("/createTask", function (req, res, next) {
  var error = validate(req.body).error;
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  Task.findOne({ title: req.body.title }, function (err, task) {
    if (err) return next(err);

    if (task) {
      return res.status(400).send("Task already exists!");
    } else {
      task = new Task({
        title: req.body.title,
        description: req.body.description,
        assigned: req.body.assigned,
        reporter: req.body.reporter,
        type: req.body.type,
        estimation: req.body.estimation
      });
      task.save(function(err) {
        if (err) return next(err);
        res.send(task);
      });
    }
  });
});

router.get("/getTasks", function (req, res, next) {
  Task.find({}, function (err, tasks) {
    if (err) return next(err);
    var taskMap = [];
    tasks.forEach(function (task) {
      taskMap.push(task);
    });
    res.send(taskMap);
  });
});

router.get("/:id", function (req, res, next) {
  Task.findById(req.params.id, function (err, task) {
    if (err) return next(err);
    if (!task) {
      return res.status(404).end();
    } else {
      return res.status(200).json(task);
    }
  });
});

router.put("/updateTask/:id", function (req, res, next) {
  Task.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      assigned: req.body.assigned,
      type: req.body.type,
      estimation: req.body.estimation,
      status: req.body.status
    },
    {
      new: true
    },
    function (err, taskUpdated) {
      if (err) return next(err);
      if (!taskUpdated) {
        return res.status(404).end();
      }
      res.status(200).json(taskUpdated);
    }
  );
});

router.get("/getTasks/backlog", function (req, res, next) {
  Task.find({ status: "backlog" }, function (err, tasks) {
    if (err) return next(err);
    var taskMap = [];
    tasks.forEach(function (task) {
      taskMap.push(task);
    });
    res.send(taskMap);
  });
});

router.get("/getTasks/development", function (req, res, next) {
  Task.find({ status: "development" }, function (err, tasks) {
    if (err) return next(err);
    var taskMap = [];
    tasks.forEach(function (task) {
      taskMap.push(task);
    });
    res.send(taskMap);
  });
});

router.get("/getTasks/codeReview", function (req, res, next) {
  Task.find({ status: "codeReview" }, function (err, tasks) {
    if (err) return next(err);
    var taskMap = [];
    tasks.forEach(function (task) {
      taskMap.push(task);
    });
    res.send(taskMap);
  });
});

router.get("/getTasks/merged", function (req, res, next) {
  Task.find({ status: "merged" }, function (err, tasks) {
    if (err) return next(err);
    var taskMap = [];
    tasks.forEach(function (task) {
      taskMap.push(task);
    });
    res.send(taskMap);
  });
});

module.exports = router;