$(document).ready(() => {
	if(window.location.pathname == "/") {
		initMainPage();
	}
	if(window.location.pathname == "/participants") {
		initParticipantsPage();
	}
	if(window.location.pathname == "/settings") {
		initSettingsPage();
	}
	if(window.location.pathname == "/addlot") {
		initAddLotPage();
	}
});

var currentLot = 0;
function initMainPage() {
	fillData();
	$("form#Misc").hide();
	$("h4#Misc").click(function() {
		$("form#Misc").toggle();
	});
	$("#UpdateLot").click(function() {
		updateLotButtonHandler();
	})
	$("#prev").click(function() {
		--currentLot;
		fillData();
	});
	$("#next").click(function() {
		++currentLot;
		fillData();
	});
	$("#DescriptionInput").val("check");
}

function fillData() {
	$.get('data/lots', function(lots) {
		console.log(lots, lots.length);
		if (lots.length > 0) {
			let data = lots[currentLot];
			$("#title-author").text("\"" + data.title + "\" by " +
				data.author);
			$("#Image").attr("src", data.imageSource);
			$("h3#Description").text("Description");
			$("p#Description").text(data.description);
			$("#TitleInput").val(data.title);
			$("#AuthorInput").val(data.author);
			$("#DescriptionInput").val(data.description);
			$("#ImageSrcInput").val(data.imageSource);
			$("#StartPriceInput").val(data.startPrice);
			$("#MinStepInput").val(data.minStep);
			$("#MaxStepInput").val(data.maxStep);
			$("#InTradesToggle").prop('checked', data.inTrades);
		}
		else {
			$("h3").text("");
			$("h3#title-author").text("There's no lots right now.");
			$("h4#Misc").hide();
		}
		checkArrows(currentLot, lots.length-1);
	})
}

function checkArrows(current, count) {
	if (current == 0) {
		$("#prev").hide();
	} else {
		$("#prev").show();
	}

	if (current == count || count <= 0) {
		$("#next").hide();
	} else {
		$("#next").show();
	}
}

function updateLotButtonHandler() {
	let data = {
		title:       $("#TitleInput").val(),
		author:      $("#AuthorInput").val(),
		description: $("#DescriptionInput").val(),
		imageSource: $("#ImageSrcInput").val(),
		startPrice:  $("#StartPriceInput").val(),
		minStep:     $("#MinStepInput").val(),
		maxStep:     $("#MaxStepInput").val(),
		inTrades:	 $("#InTradesToggle").val()
	}
	$.post("/data/lot/update" + currentLot, data);
	fillData();
}

// Script for add lot page
function initAddLotPage() {
	console.log("Adding new lot");
	$("#AddLotButton").click(function() {
		let data = {
			title:       $("#TitleInput").val(),
			author:      $("#AuthorInput").val(),
			description: $("#DescriptionInput").val(),
			imageSource: $("#ImageSrcInput").val(),
			startPrice:  $("#StartPriceInput").val(),
			minStep:     $("#MinStepInput").val(),
			maxStep:     $("#MaxStepInput").val(),
			inTrades:	 $("#InTradesToggle").val()
		}
		$("input").val("");
		$("textarea").val("");
		$.post('/data/lot', data);
	});
}

function initSettingsPage() {
	fillSettingsInputs();
	$("#SaveSettingsButton").click(function() {
		const data = {
			date:         $("#AuctionDateInput").val(),
			time:         $("#AuctionTimeInput").val(),
			lotTimeout:   $("#AuctionLotTimeoutInput").val(),
			initialPause: $("#AuctionInitialPause").val()
		}
		console.log(data);
		$.post('/data/settings', data)
	});
}

function fillSettingsInputs() {
	$.get('/data/settings', (data) => {
		console.log("Got settings:", data);
		$("#AuctionDateInput").val(data.date);
		$("#AuctionTimeInput").val(data.time);
		$("#AuctionLotTimeoutInput").val(data.lotTimeout);
		$("#AuctionInitialPause").val(data.initialPause);
	});
}

//  Script for participants page
var currentParticipant = null;
function initParticipantsPage() {

	$("#AddNewParticipantButton").click(function() {
		console.log("AddNewParticipantButton clicked");
		if (!document.getElementById("AddParticipantForm").checkValidity()) {
			$("input").css({'background-color': '#344'});
		} else {
			let NewParticipant = {
				name: $("#NewParticipantNameInput").val(),
				wealth: $("#NewParticipantWealthInput").val()
			};
			$.post("/data/participant", NewParticipant);
		}
		refreshParticipantsTable();
	});

	$("#ParticipantModalClose").click(function() {
		console.log("ParticipantModalClose btn clicked");
		$("#ParticipantModalBackground").hide();
	});

	$("#ParticipantModalSave").click(function() {
		console.log("ParticipantModalSave btn clicked");
		let newData = {
			name:   $("#ParticipantModalName").val(),
			wealth: $("#ParticipantModalWealth").val()
		};
		$.post('/data/participant/update' + currentParticipant, newData);
		refreshParticipantsTable();
		$("#ParticipantModalBackground").hide();
	});

	$("#ParticipantModalDelete").click(function() {
		$.post('/data/participant/delete'+currentParticipant);
		refreshParticipantsTable();
		$("#ParticipantModalBackground").hide();
	});

	refreshParticipantsTable();
}

function refreshParticipantsTable() {
	$.get("/data/participants", (data) => {
		console.log("Got participants:", data, data.length, data[1]);
		$("#ParticipantsTable").empty();
		if (data.length == 0) {
			let row = $("<tr>").addClass("TableRow").text("No participants.");
			$("#ParticipantsTable").append(row);
		} else {
			let row = "<tr><th>Name</th><th>Wealth</th></tr>"
			$("#ParticipantsTable").append(row);
			for (let i = 0; i < data.length; ++i) {
				let row = $("<tr>")
					.append(`<td>${data[i].name}</td><td>${data[i].wealth}</td>`)
					.click(function() {
						showParticipantModal(data[i].id);
					})

				$("#ParticipantsTable").append(row);
			}
		}
	});
}

function showParticipantModal(id) {
	currentParticipant = id;
	$.get("/data/participant/"+id, (data) => {
		console.log("Got participant", data);
		$("#ParticipantModalName").val(data.name);
		$("#ParticipantModalWealth").val(data.wealth);
		$("#ParticipantModalBackground").show();
	});
}

// appends an "active" class to .popup and .popup-content when the "Open" button is clicked
$(".edit-btn").on("click", function() {
	console.log("Edit btn pressed");
	$(".popup-overlay, .popup-content").addClass("active");
});

// removes the "active" class to .popup and .popup-content when the "Close" button is clicked 
$(".close-btn").on("click", function() {
	console.log("Close edit btn pressed");
	$(".popup-overlay, .popup-content").removeClass("active");
});