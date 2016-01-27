"use strict";

var url = "http://localhost:3000/meals";

var addButton = document.querySelector(".button");
var filterByDateButton = document.querySelector(".filterDate");
var listOfMeals = document.querySelector(".listMeals");
var listAllButton = document.querySelector(".listAll");
var mealNumber = document.querySelector(".numberOfMeals")
var sumCalories = document.querySelector(".sumCalories");
var textAreaMeal = document.querySelector(".addMeal");
var textAreaCalories = document.querySelector(".addCalories");
var textAreaDate = document.querySelector("#date");
var textAreaFilterDate = document.querySelector(".filterByDate");


function getDateFromServer(url, callback) {
	var req = new XMLHttpRequest;
	req.open('GET', url);
	req.setRequestHeader('Content-Type', 'application/json');
	req.send();
	req.onreadystatechange = function () {
		if(req.readyState === 4) {
			var res = JSON.parse(req.response);
			callback(res);
		}
	}
}


function filterDate(res) {
	res.forEach(function(meal) {
		if(meal.date === textAreaFilterDate.value) {
			clears();
			listOfMeals.innerText = meal.name + " " + meal.calories + " " + meal.date;
		}
	});
}


function clears() {
	listOfMeals.innerText = "";
}


function sumAllTheCalories(res) {
	var summa = 0;
	res.forEach(function(meal) {
		summa += meal.calories;
	});
	sumCalories.innerText = "Calories : " + summa;
	return summa;
}

function numberOfMeals(res) {
	var count = 0;
	res.forEach(function(meal) {
		count ++
	})
	mealNumber.innerText = "You have " + count + " item(s)";
	return count;
}

listMealsFromServer(numberOfMeals);


function listAllMeals() {
	listMealsFromServer(listMealsOnHtml)
}

function postNewMealToServer(callback) {
	var req = new XMLHttpRequest();
	req.open("POST", url);
	req.setRequestHeader('Content-Type', 'application/json');
	req.send(JSON.stringify({name: textAreaMeal.value, calories: textAreaCalories.value, date: textAreaDate.value}));
	console.log("start");
	req.onreadystatechange = function () {
		if(req.readyState === 4) {
			var postedMeal = JSON.parse(req.response);
			console.log("sikerült");
			return callback(postedMeal);
		}
	}
}


function listMealsFromServer(callback) {
	var req = new XMLHttpRequest();
	req.open("GET", url);
	req.send();
	req.onreadystatechange = function () {
		if(req.readyState === 4) {
			var res = JSON.parse(req.response);
			console.log("response ok");
			return callback(res);
		}
	}
}


function listMealsOnHtml(res) {
	res.forEach(function(meal) {
		var newMeal = document.createElement("p");
		newMeal.innerText = meal.name + " " + meal.calories + " " + meal.date;
		listOfMeals.appendChild(newMeal);
	});
}


listAllMeals();

listMealsFromServer(sumAllTheCalories);


addButton.addEventListener("click", function() {
	postNewMealToServer(listAllMeals);
});


filterByDateButton.addEventListener("click", function() {
	var newUrl = url + "/filter/" + textAreaFilterDate.value;
	clears();
	getDateFromServer(newUrl, listMealsOnHtml);
});


listAllButton.addEventListener("click", listAllMeals);
