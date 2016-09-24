var config = {
    apiKey: "AIzaSyAjmfTEI1PbjRJekVuQB--R-K9MNZfq20c",
    authDomain: "rubus-53281.firebaseapp.com",
    databaseURL: "https://rubus-53281.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "576957396220"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Bus Lines
$("#addBusBtn").on("click", function(){

	// Grabs user input
	var busName = $("#busNameInput").val().trim();
	var busPlace = $("#placeInput").val().trim();
	var busStart = moment($("#startInput").val().trim(), "h:mm").format("X");
	var busRate = $("#rateInput").val().trim();

	// Creates local "temporary" object for holding bus data
	var newBus = {
		name:  busName,
		place: busPlace,
		start: busStart,
		rate: busRate
	};

	database.ref().push(newBus);

	// Logs everything to console
	console.log(newBus.name);
	console.log(newBus.place);
	console.log(newBus.start);
	console.log(newBus.rate)

	// Alert
	alert("Bus Line successfully added");

	// Clears all of the text-boxes
	$("#busNameInput").val("");
	$("#placeInput").val("");
	$("#startInput").val("");
	$("#rateInput").val("");

	// Prevents moving to new page
	return false;
});


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var busName = childSnapshot.val().name;
	var busPlace = childSnapshot.val().place;
	var busStart = childSnapshot.val().start;
	var busRate = childSnapshot.val().rate;

	// Employee Info
	console.log(busName);
	console.log(busPlace);
	console.log(busStart);
	console.log(busRate);

	// Prettify the employee start
	var busStartPretty = moment.unix(busStart).format("X");
	// Calculate the months worked using hardconre math
	// To calculate the months worked
	var arrival = moment().diff(moment.unix(busStart, 'X'), "mm");
	//console.log(arrival);


var bRate = busRate;
var firstTime = busStart;
var hours = Math.floor((firstTime/360000)%24);
var minutes = Math.floor((firstTime%360000)/6000);
firstTime = hours + ":" + minutes;
 // Time is 3:30 AM
		// have this where the user's input will populate this, leaving open with "".

var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
	console.log(firstTimeConverted);

var currentTime = moment();
	console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

var tRemainder = diffTime % bRate;
	console.log(tRemainder);

// Minute Until Train
var tMinutesTillBus = bRate - tRemainder;
	console.log("MINUTES TILL BUS: " + tMinutesTillBus);

// Next Train
var nextBus = moment().add(tMinutesTillBus, "minutes")
	console.log("ARRIVAL TIME: " + moment(nextBus).format("hh:mm"));

	$("#busTable > tbody").append("<tr><td>" + busName + "</td><td>" + busPlace + "</td><td>" + busStartPretty + "</td><td>" + arrival + "</td><td>" + busRate + "</td><td>");

});