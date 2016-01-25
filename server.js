"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var items = require("./items.js");

var app = express();

app.use(logRequest);
app.use(express.static("public"));
app.use(bodyParser.json());

app.listen(3000, function() {
	console.log("Listening on port 3000...")
});


app.get("/meals", function(req, res) {
	items.all(function (result) {
		res.status(200).json(result);
	});
});


app.get("/meals/:id", function(req, res) {
	var id = parseInt(req.params.id);
	items.getOneMeal(id, function (item) {
		res.status(200).json(item);
	});
});


app.delete("/meals/:id", function(req, res) {
	var id = parseInt(req.params.id);
	items.deleteMeal(id, function (item) {
		res.status(200).json(item);
	});
});


app.post("/meals", function(req, res) {
	var attribute = req.body;
	items.postMeal(attribute, function (item) {
		res.status(200).json(item);
	});
});



function logRequest(req, res, next) {
  var parts = [
    new Date(),
    req.method,
    req.originalUrl,
  ];
  console.log(parts.join(" "));
  next();
};
