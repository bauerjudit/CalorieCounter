"use strict";

var url = "http://localhost:3000/meals";

var addButton = document.querySelector(".addButton"); // 
var consumedCalories = document.querySelector(".consumedCalories");
var filterByDateButton = document.querySelector(".filterDate"); //
var listOfMeals = document.querySelector(".listMeals"); //
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
	while (listOfMeals.firstChild) {
		listOfMeals.removeChild(listOfMeals.firstChild)
	}
}


function countConsumedCalories(res) {
	var dailyMaxCalories = 1500;
	var summa = 0;
	res.forEach(function(meal) {
		summa += meal.calories;
	});
	var percent = 100 - (((dailyMaxCalories - summa) / dailyMaxCalories) * 100);
	percent.stringify
	console.log(percent)
	console.log(percent + "%")
	document.getElementById("progressbar").style.width = percent + "%";
}




function sumAllTheCalories(res) {
	var summa = 0;
	res.forEach(function(meal) {
		summa += meal.calories;
	});
	sumCalories.innerText = "Calories : " + summa + " cal";
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
	listMealsFromServer(listMealsOnHtmlTable);
}


listOfMeals.addEventListener("click", function(e) {
	e.target.parentNode.remove();
	var id = e.target.parentNode.getAttribute("id");
	deleteMealFromServer(id);
	listMealsFromServer(sumAllTheCalories);
	listMealsFromServer(numberOfMeals);
	listMealsFromServer(countConsumedCalories);
})
 


function deleteMealFromServer(id) {
	var req = new XMLHttpRequest();
	req.open("DELETE", url + "/" + id);
	req.send();
}



function selectMeal() {}



function postNewMealToServer(callback) {
	var req = new XMLHttpRequest();
	req.open("POST", url);
	req.setRequestHeader('Content-Type', 'application/json');
	req.send(JSON.stringify({name: textAreaMeal.value, calories: textAreaCalories.value, date: textAreaDate.value}));
	req.onreadystatechange = function () {
		if(req.readyState === 4) {
			var postedMeal = JSON.parse(req.response);
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
			callback(res);
		}
	}
}

function listMealsOnHtmlTable(res) {
	var meals = res;
	for(var i = 0; i < meals.length; i++) {
		addMealsToHtmlTable(i, meals[i]);
	};
}



function addMealsToHtmlTable(i, meal) {
	var tableElement = listMealInTable(i, meal);
	listOfMeals.innerHTML += tableElement;
}



function listMealInTable(i, meal) {
	var date = meal.date.split("T")[0];
	var line = `<tr id="${meal.id}">
					<td>${i + 1}</td>
                   <td>${meal.name}</td>
                   <td>${meal.calories}</td>
                   <td>${date}</td>
                 </tr>`;
     return line;
}



listAllMeals();

listMealsFromServer(numberOfMeals);

listMealsFromServer(sumAllTheCalories);

listMealsFromServer(countConsumedCalories);




addButton.addEventListener("click", function() {
	clears();
	postNewMealToServer(refresCallback);
	listMealsFromServer(countConsumedCalories)
	listMealsFromServer(sumAllTheCalories);
	listMealsFromServer(numberOfMeals);

	
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
