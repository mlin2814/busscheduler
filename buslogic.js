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

	var today = new Date();
	var thisMonth = today.getMonth() + 1;
	var thisDate = today.getDate();
	var thisYear = today.getFullYear();

// DATE STRING //

  var dateString = "";
  var dateString = dateString.concat(thisMonth, "/", thisDate, "/", thisYear);


	// Uploads employee data to the database
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
	console.log(arrival);

	// Calculate the total billed rate
	// var empBilled = empMonths * empRate;
	// console.log(empBilled);

    var busFirstArrivalTime = value.busStart;
    
// VARIABLE CALCULATIONS //

    var busNextDeparture;
    var minutesAway;

// MOMENT //

    var convertedDate = moment(new Date(busFirstArrivalTime));
    
// MINUTES AWAY //

    var minuteDiffFirstArrivalToNow = moment(convertedDate).diff( moment(), "minutes")*(-1);

      // Check for New Train Times //
      
      if(minuteDiffFirstArrivalToNow <= 0){

        // Current Departure //

        minutesAway = moment(convertedDate).diff( moment(), "minutes");

        // Next Depature Time //

        busNextDepartureDate = convertedDate;

      }

      else{

        // Next Train Departure //

        busMinutesAway = busRate - (minuteDiffFirstArrivalToNow % busRate);

        // Next Departure Time //

        var trainNextDepartureDate = moment().add(trainMinutesAway, 'minutes');
      }

// AM/PM //

    trainNextDeparture = trainNextDepartureDate.format("hh:mm A");

	// Add each train's data into the table
	$("#busTable > tbody").append("<tr><td>" + busName + "</td><td>" + busPlace + "</td><td>" + busStartPretty + "</td><td>" + arrival + "</td><td>" + busRate + "</td><td>");

});