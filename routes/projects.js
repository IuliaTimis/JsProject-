var Project = require("../models/project").Project;
var validate = require("../models/project").validate;
var express = require("express");
var router = express.Router();

router.post("/createProject", function (req, res) {
  var error = validate(req.body).error;
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  Project.findOne({ title: req.body.title }, function(err, project) {
    if (project) {
      return res.status(400).send("Project already exists!");
    } else {
      project = new Project({
        title: req.body.title,
        description: req.body.description,
        tasks: req.body.tasks,
        members: req.body.members
      });
      project.save(function(err) {
        if (err) console.error(err);
        res.send(project);
      });
    }
  });
});

router.get("/getProjects", function (req, res) {
  Project.find({}, function (error, projects) {
    var projectMap = [];
    projects.forEach(function (project) {
      projectMap.push(project);
    });
    res.send(projectMap);
  });
});

router.get("/:id", function (req, res) {
  Project.findById(req.params.id, function(error, project) {
    if (!project) {
      return res.status(404).end();
    } else {
      return res.status(200).json(project);
    }
  });
});

router.put("/updateProject/:id", function (req, res) {
  Project.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description
    },
    {
      new: true,
      returnOriginal: false,
    },
    function(error, projectUpdated) {
      if (error) {
        console.error(error);
        return res.status(500).end();
      }
      if (!projectUpdated) {
        return res.status(404).end();
      }
      return res.status(200).json(projectUpdated);
    }
  );
});

router.put("/updateProjectWithTasks/:id", function (req, res) {
  Project.findByIdAndUpdate(
    req.params.id,
    {
      tasks: req.body.tasks
    },
    {
      new: true,
      returnOriginal: false,
    },
    function(error, projectUpdated) {
      if (error) {
        console.error(error);
        return res.status(500).end();
      }
      console.log(projectUpdated);
      if (!projectUpdated) {
        return res.status(404).end();
      }
      return res.status(200).json(projectUpdated);
    }
  );
});

router.delete("/deleteProject/:id", function (req, res) {
  var id = req.params.id;
  Project.findByIdAndDelete(id, function (error, response) {
    if (!response) {
      res.status(500).json("Project with id:" + id + " doesn't exist.");
    } else {
      if (error) {
        res
          .status(404)
          .json("Project with id:" + id + " was not deleted. Something went wrong.")
          .end();
      } else {
        res.status(200).json("Project with id:" + id + " deleted succesfully");
      }
    }
  });
});

module.exports = router;