$(document).ready(() => {
	$("#PaintingsHeaderButton").click(function() {
		console.log("Current href: " + window.location.href);
		window.location.href = "/";
	});
	$("#ParticipantsHeaderButton").click(function() {
		window.location.href = "/participants";
	});
	$("#SettingsHeaderButton").click(function() {
		window.location.href = "/settings";
	});
	$("#AddLotHeaderButton").click(function() {
		window.location.href = "/addlot";
	});
})
