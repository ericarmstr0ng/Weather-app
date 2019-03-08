// Author: Eric Armstrong
// Date: 5/10/2018
// Description: Retrieves data from OpenWeather.com and assigns data to the 
// appropriate values for weather.html


// OpenWeather apiKey
var apiKey = 'e3346992a4d331af3cde72d08f24263f';

document.addEventListener('DOMContentLoaded', bindButtons);

//function to bind submit button to retrieving info from OpenWeather
function bindButtons(){
	document.getElementById('citySubmit').addEventListener('click', function(event){
		var req = new XMLHttpRequest();	

		// Returns values for zipcode if values entered are all numbers
		if(!isNaN(cityVal.value)){
			var payload = {zip:null};
			payload.zip = document.getElementById('cityVal').value;
			req.open("GET", "http://api.openweathermap.org/data/2.5/weather?zip=" + cityVal.value +"&units=imperial" + "&APPID=" + apiKey,true);
		}

		// Returns values for city names if letters are entered
		else{
			var payload = {q:null};
			payload.q = document.getElementById('cityVal').value;
			req.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + cityVal.value + "&units=imperial" + "&APPID=" + apiKey,true);
		}

		req.addEventListener('load',function(){
				if(req.status >= 200 && req.status < 400){		
				var response = JSON.parse(req.responseText);
				document.getElementById('cityId').textContent = response.name;
				document.getElementById('cityTemp').textContent = response.main.temp;
				document.getElementById('cityWeather').textContent = response.weather[0].main;
		    } 
	        else {
		    	console.log("Error in network request: " + req.statusText);
		    }
		  });
		req.send(JSON.stringify(payload));

		event.preventDefault();
	})
}