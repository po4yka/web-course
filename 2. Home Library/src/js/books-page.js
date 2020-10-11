let currentBookId = null;
let buffer;

// updateTable();

function sendRequest(requestType, URL, data = "", sync = true,
	                  callback = (text) =>
						{
							console.log(text);
							updateTable();
						}) {
	
	console.log("Sending", requestType, "request at URL:", URL, "with data", data);
	
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		// 4 - DONE state;
		// 200 - OK status
		console.log("XMLHttpRequest ready state changed");
		if (this.readyState == 4 && this.status == 200) {
			callback(this.responseText);
		}
	}

	xhttp.open(requestType, URL, sync);
	xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

	if (URL.includes("before-date-sort")) {
		var dataArray = data.split('-');
		let date = `{"year":${dataArray[0]},"month":${parseInt(dataArray[1], 10)},"day":${dataArray[2]}}`;
		console.log(`Filter date: ${date}`);
		xhttp.send(date);
	} else {
		xhttp.send(JSON.stringify(data));
	}
}

// Request for book by id
function getBook(id) {
	console.log(`GET ${id} book request`);
	sendRequest("GET", "/library/" + id, "", false, (text) => {
		window.history.pushState("", "", `/library/${id}`);
		console.log(`Book string: ${text}`);
		buffer = JSON.parse(text);
	});

	return buffer;
}

function filterByDate() {
	let date = document.getElementsByName("book-return-form")[0].value;
	sendRequest("POST", "/library/before-date-sort", date, true, (text) => {
		window.history.pushState("", "", '/library/before-date-sort');
		console.log("Callback for GET to /library/table");
		// set the error text instead of the table
		document.body.parentElement.innerHTML=text;
	})
}

// Main page filter updating
function updateTable() {
	if (document.getElementsByName("filter")[0].checked) {
		// sendRequest( method, url, header, requestBody, successCB, errorCB, 
		// [user], [password], [timeout], [certSource] )
		sendRequest("GET", "/library/table", "", true, (text) => {
			window.history.pushState("", "", '/library/table');
			console.log("Callback for GET to /library/table");
			// set the error text instead of the table
			document.body.parentElement.innerHTML=text;
		})
	} else if (document.getElementsByName("filter")[1].checked) {
		sendRequest("GET", "/library/table-in-stock", "", true, (text) => {
			window.history.pushState("", "", '/library/table-in-stock');
			console.log("Callback for GET to /library/table-in-stock");
			document.body.parentElement.innerHTML=text;
			let filter = document.getElementsByName("filter");
			for (btn of filter.values()) {
				if (btn.value == "inStock") {
					btn.checked = true;
				}
			}
		})
	} else if (document.getElementsByName("filter")[2].checked) {
		sendRequest("GET", "/library/table-in-use", "", true, (text) => {
			window.history.pushState("", "", '/library/table-in-use');
			console.log("Callback for GET to /library/table-in-use");
			document.body.parentElement.innerHTML=text;
			let filter = document.getElementsByName("filter");
			for (btn of filter.values()) {
				if (btn.value == "inUse") {
					btn.checked = true;
				}
			}
		})
	} else if (document.getElementsByName("filter")[3].checked) {
		sendRequest("GET", "/library/table-outdated", "", true, (text) => {
			window.history.pushState("", "", '/library/table-outdated');
			console.log("Callback for GET to /library/table-outdated");
			document.body.parentElement.innerHTML=text;
			let filter = document.getElementsByName("filter");
			for (btn of filter.values()) {
				if (btn.value == "outdated") {
					btn.checked = true;
				}
			}
		})
	}
}

function showBookInformationInModel(book) {
	document.getElementById("book-id-input").value = book.id;
	document.getElementById("book-title-input").value = book.title;
	document.getElementById("book-author-input").value = book.author;
	document.getElementById("book-date-input").value = book.date;
	document.getElementById("GiveButton").style.display = 'none';
	document.getElementById("ReturnButton").style.display = 'none';

	if (book.owner != null) {
		document.getElementById("user-label").textContent = "Was taken by " + 
									book.owner + " until " + book.returnDate;
		document.getElementById("ReturnButton").style.display = 'inline';
	} else {
		document.getElementById("user-label").textContent = "";
		document.getElementById("GiveButton").style.display = 'inline';
	}
	document.getElementById("bookModal").style.display='block';
}

function toggleModalWindow(i = null) {
	// hide opened book modal informatoin window
	if (currentBookId != null) {
		window.history.back();
		document.getElementById("bookModal").style.display='none';
		currentBookId = null;
		return;
	}
	if (i == null) {
		return;
	}

	currentBookId = i;
	book = getBook(currentBookId);
	console.log("Got the book ", book);
	showBookInformationInModel(book);
}

// "Add book" modal window
function toggleAddModalWindow() {
	document.getElementById("NewBookTitle").value = "";
	document.getElementById("NewBookAuthor").value = "";
	document.getElementById("NewBookDate").value = "";
	if (document.getElementById("addModal").style.display == 'block') {
		document.getElementById("addModal").style.display = 'none';
	} else {
		document.getElementById("addModal").style.display = 'block';
	}
}

// "Add book" button click handlers
function addBookOK() {
	// checks whether the element has any constraints
	// and whether it satisfies them
	if (!document.getElementById("addForm").checkValidity()) {
		return;
	}
	// Creating request
	let title = document.getElementById("NewBookTitle").value;
	let author = document.getElementById("NewBookAuthor").value;
	let date = document.getElementById("NewBookDate").value;
	sendRequest("POST", '/library', {title, author, date});
	// Closing modal
	toggleAddModalWindow();
	// Updating table
	updateTable();
}

function addBookCancel() {
	toggleAddModalWindow();
}

function giveButtonClick() {
	toggleGiveModalWindow();
}

function saveButtonClick(id) {
	title = document.getElementById("book-title-input").value;
	author = document.getElementById("book-author-input").value;
	date = document.getElementById("book-date-input").value;
	createPutRequest(currentBookId, title, author, date);
	toggleModalWindow();
}

function returnButtonClick() {
	console.log("Returning a book with id", currentBookId);
	id = currentBookId;
	if (id == null) {
		console.log("Something is wrong in returnButtonClick!");
	}
	owner = document.getElementById("user-input").value;
	returnDate = document.getElementById("return-date-input").value;

	sendRequest("PUT", '/library/return', {id, owner, returnDate});
	toggleModalWindow();
	toggleModalWindow(id);
	updateTable();
}

// PUT
function createPutRequest(currentBook, title, author, date) {
	let id = currentBook;
	sendRequest("PUT", '/library', {id, title, author, date});
	updateTable();
}

// POST
function createPostRequest(title, author, date) {
	sendRequest("POST", '/library', {title, author, date});
	updateTable();
}

function deleteButtonClick() {
	let id = currentBookId;
	console.log(`Creating delete request with ${id} id`);
	sendRequest("DELETE", '/library', {id});
	toggleModalWindow();
	updateTable();
}

// "Give book" modal window
function toggleGiveModalWindow() {
	document.getElementById("return-date-input").value="";
	document.getElementById("user-input").value="";
	if (document.getElementById("giveModal").style.display=='block') {
		document.getElementById("giveModal").style.display='none';
	} else {
		document.getElementById("giveModal").style.display='block';
	}
}

// "Give book" button click handlers
function giveBookCancel() {
	toggleGiveModalWindow();
}

function giveBookOK() {
	if (!document.getElementById("giveForm").checkValidity()) {
		return;
	}
	let owner = document.getElementById("user-input").value;
	let returnDate = document.getElementById("return-date-input").value;
	let today = new Date(); //  the same as the UNIX epoch
	let inputDate = new Date(returnDate);
	let td = today.getDay(),
	    tm = today.getMonth(),
	    ty = today.getYear(),
			id = inputDate.getDay(),
			im = inputDate.getMonth(),
			iy = inputDate.getYear();
	if (iy < ty) {
		return;
	}
	if (ty == iy && im < tm) {
		return;
	}
	if (ty == iy && im == tm && id < td) {
		return;
	}

	id = currentBookId;
	if (id == null) {
		console.log("Something went wrong with giveBookOK!");
	}

	sendRequest("PUT", '/library/give', {id, owner, returnDate});
	toggleGiveModalWindow();
	toggleModalWindow();
	toggleModalWindow(id);
	updateTable();
}
