'use strict';

var Joi = require("joi");
var mongoose = require("mongoose");

var ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  },
  tasks: {
    type: Array,
    default: []
  },
  members: {
    type: Array,
    default: []
  }
});

var Project = mongoose.model('Project', ProjectSchema);

function validateProject(project) {
  var schema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string(),
    tasks: Joi.array(),
    members: Joi.array()
  });
  return Joi.validate(project, schema);
}

exports.Project = Project;
exports.validate = validateProject;