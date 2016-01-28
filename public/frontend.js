"use strict";

var url = "http://localhost:3000/meals";

var addButton = document.querySelector(".addButton"); // 
var consumedCalories = document.querySelector(".consumedCalories");
var filterByDateButton = document.querySelector(".filterDate");
var listOfMeals = document.querySelector(".listMeals");
var listAllButton = document.querySelector(".listAll"); //
var mealNumber = document.querySelector(".numberOfMeals") //
var sumCalories = document.querySelector(".sumCalories"); //
var textAreaMeal = document.querySelector(".addMeal"); //
var textAreaCalories = document.querySelector(".addCalories"); //
var textAreaDate = document.querySelector(".addDate"); //
var textAreaFilterDate = document.querySelector(".filterByDate"); //


function getDateFromServer(url, callback) {
	var req = new XMLHttpRequest;
	req.open('GET', url);
	req.setRequestHeader('Content-Type', 'application/json');
	req.send();
	req.onreadystatechange = function () {
		if(req.readyState === 4) {
			var res = JSON.parse(req.response);
			console.log(res);
			callback(res);
		}
	}
}

function refresCallback() {
	clears();
	listMealsFromServer(listMealsOnHtmlTable);
}

function clears() {
	while (listOfMeals.firstChild) {listOfMeals.removeChild(listOfMeals.firstChild)}
     // listOfMeals.innerHtml = "";
}


function countConsumedCalories(res) {
	var dailyMaxCalories = 1500;
	var summa = 0;
	res.forEach(function(meal) {
		summa += meal.calories;
	});
	consumedCalories.innerText = "You have " + (dailyMaxCalories - summa) + " calories left";
	return (dailyMaxCalories - summa);

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


function listAllMeals() {
	//listMealsFromServer(listMealsOnHtml)
	listMealsFromServer(listMealsOnHtmlTable);
}

function postNewMealToServer(callback) {
	var req = new XMLHttpRequest();
	req.open("POST", url);
	req.setRequestHeader('Content-Type', 'application/json');
	console.log(JSON.stringify({name: textAreaMeal.value, calories: textAreaCalories.value, date: textAreaDate.value}))
	req.send(JSON.stringify({name: textAreaMeal.value, calories: textAreaCalories.value, date: textAreaDate.value}));
	console.log("start");
	req.onreadystatechange = function () {
		if(req.readyState === 4) {
			var postedMeal = JSON.parse(req.response);
			console.log("sikerült");
			console.log(postedMeal)
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
			console.log(res)
			callback(res);
		}
	}
}

function listMealsOnHtmlTable(res) {
	var meals = res;
	meals.forEach(function(meal) {
		addMealsToHtmlTable(meal);
	});
}



function addMealsToHtmlTable(meal) {
	var tableElement = listMealInTable(meal);
	listOfMeals.innerHTML += tableElement;
}



function listMealInTable(meal) {
	console.log(meal);
	var date = meal.date.split("T")[0];
	var line = `<tr id="${meal.id}">
                   <td>${meal.name}</td>
                   <td>${meal.calories}</td>
                   <td>${date}</td>
                 </tr>`;
     return line;
}


/*function listMealsOnHtml() {
	res.forEach(function(meal) {
		var newMeal = document.createElement("p");
		newMeal.innerText = meal.name + " " + meal.calories + " " + meal.date.split("T")[0];
		listOfMeals.appendChild(newMeal);
	});
}*/


listAllMeals();

listMealsFromServer(numberOfMeals);

listMealsFromServer(sumAllTheCalories);

listMealsFromServer(countConsumedCalories);

addButton.addEventListener("click", function() {
	clears();
	postNewMealToServer(refresCallback);
	
});


filterByDateButton.addEventListener("click", function() {
	var newUrl = url + "/filter/" + textAreaFilterDate.value;
	clears();
	getDateFromServer(newUrl, listMealsOnHtmlTable);
	getDateFromServer(newUrl, sumAllTheCalories);
	getDateFromServer(newUrl, numberOfMeals);
	getDateFromServer(newUrl, countConsumedCalories);
});


listAllButton.addEventListener("click", function() {
	clears();
	listAllMeals();
	listMealsFromServer(sumAllTheCalories);
	listMealsFromServer(numberOfMeals);
	listMealsFromServer(countConsumedCalories);
});
