"use strict";

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'caloriecounter',
  timezone : 'utc'
});

connection.connect();


function getMeals(callback) {
	connection.query('SELECT * FROM caloriecounter', function(err, result) {
		if (err) throw err;
		callback(result);
	});
}


function getOneMeal(id, callback) {
	connection.query('SELECT * FROM caloriecounter WHERE id = ?', id, function(err, result) {
		if (err) throw err;
		var item = result[0];
		callback(item);
	});
}

function deleteMeal(id, callback) {
	connection.query('DELETE FROM caloriecounter WHERE id = ?', id, function(err, result) {
		if (err) throw err;
		var item = result[0];
		callback(item);
	});
}


function postMeal(attribute, callback) {
	connection.query('INSERT INTO caloriecounter SET ?', attribute, function(err, result) {
		if (err) throw err;
		callback(result.insertId, callback);
	});
}


function filterDate(date, callback) {
	connection.query('SELECT id, name, calories, date FROM caloriecounter WHERE CAST(date AS DATE)=?', date, function(err, result) {
		if (err) throw err;
		callback(result);
	});
}

module.exports = {
  all: getMeals,
  getOneMeal: getOneMeal,
  deleteMeal: deleteMeal,
  postMeal: postMeal,
  filterDate: filterDate
};