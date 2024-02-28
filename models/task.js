var Joi = require("joi");
var mongoose = require("mongoose");

var taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    assigned: {
        type: String,
        default: null
    },
    reporter: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: null
    },
    estimation: {
        type: Number,
        default: null
    },
    status: {
        type: String,
        default: "backlog"
    }
});

var Task = mongoose.model('Task', taskSchema);

function validateTask(task) {
    var schema = {
        title: Joi.string().required(),
        description: Joi.string(),
        assigned: Joi.string(),
        reporter: Joi.string().required(),
        type: Joi.string(),
        estimation: Joi.number(),
        status: Joi.string()
    };
    return Joi.validate(task, schema);
}

exports.Task = Task;
exports.validateTask = validateTask;