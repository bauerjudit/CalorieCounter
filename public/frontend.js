"use strict";

var url = "http://localhost:3000/meals";

var listOfMeals = document.querySelector(".listMeals");


function startRequest() {
	postNewMealToServer(postNewMealToHtml);
}

function postNewMealToHtml(postedMeal) {
	listOfMeals.innerText = postedMeal.text;
}

function postNewMealToServer(callback) {
	var req = new XMLHttpRequest();
	req.open("POST", url);
	req.setRequestHeader('Content-Type', 'application/json');
	console.log({name: textAreaMeal.value, calories: textAreaCalories.value, date: textAreaDate.value})
	req.send(JSON.stringify({name: textAreaMeal.value, calories: textAreaCalories.value, date: textAreaDate.value}));
	console.log(JSON.stringify({name: textAreaMeal.value, calories: textAreaCalories.value, date: textAreaDate.value}));
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


function listMealsOnHtml(listItems) {
	listItems.forEach(function(meal) {
		var newMeal = document.createElement("p");
		newMeal.innerText = meal.name + " " + meal.calories + " "  + meal.date;
		listOfMeals.appendChild(newMeal);
	});
}


listMealsFromServer(listMealsOnHtml);

var textAreaMeal = document.querySelector(".addMeal");
var textAreaCalories = document.querySelector(".addCalories");
var textAreaDate = document.querySelector("#date");

var addButton = document.querySelector(".button");
addButton.addEventListener("click", startRequest);
