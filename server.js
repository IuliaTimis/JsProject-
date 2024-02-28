var express = require("express");
var mongoose = require("mongoose");
var dotenv = require("dotenv");
var cors = require("cors");

var users = require("./routes/users");
var tasks = require("./routes/tasks");
var projects = require("./routes/projects");

dotenv.config();

var app = express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  'mongodb+srv://cristidarjan22:P5ArRhCSwQ3FUq1M@cluster0.s5npjql.mongodb.net/?retryWrites=true&w=majority'
);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", function () {
  console.log("Connected succesfully to database");
});

app.use("/api/users", users);
app.use("/api/tasks", tasks);
app.use("/api/projects", projects);

var port = process.env.PORT || 5000;
app.listen(port, function() { console.log('Listening on port ' + port + '...'); });