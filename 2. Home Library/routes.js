const express = require("express");
const passport = require('passport');
const librarian = require("./src/js/librarian");
const pug = require("pug");

// because using separated rendering file local
const router = express.Router();

router.get("/", (req, res, next) => {
	console.log("GET root (/) server request");
    res.render('login', {title: 'Login'});
    next(); // go to the next handler
});

router.post("/autherization", (req, res, next) => {
	console.log("POST autherization called");
	console.log(req.body);
	passport.authenticate('local', { successRedirect: "/library",
		failureRedirect: "/authorization" })(req, res, next); 
})

router.get("/authorization", (req, res, next) => {
	console.log("Authorization page opened");
	res.render("authorization");
	next();
});

router.get("/library", (req, res, next) => {
	console.log(`User: ${req.user} for GET to /library; auth status: ${req.isAuthenticated()}`);
	if (req.user) {
		console.log("Main books page opened");
		res.render("books-page", {
			books: librarian.books
		});
		next();
	} else {
		res.redirect('/authorization');
	}
});

router.get("/library/table", (req, res, next) => {
	if (req.user) {
		console.log("Books table render");

		res.send(pug.compileFile("./src/views/books-page.pug")( {books: librarian.books}));

		res.end();
		next();
	} else {
		res.redirect('/authorization');
	}
});

/**
 * Render the same page, as table, but with filter for books arr
 */

router.get('/library/table-in-stock', (req, res, next) => {
	if (req.user) {
		console.log("Got GET request at /library/table-in-stock");

		res.send(pug.compileFile("./src/views/books-page.pug")( {books: librarian.books.filter (
			(book) => { // Filter function
				return (book.owner === null);
			}
		)}));

		next();
	} else {
		res.redirect('/authorization');
	}
});

router.get('/library/table-in-use', (req, res, next) => {
	if (req.user) {
		console.log("Got GET request at /library/table-in-use");

		res.send(pug.compileFile("./src/views/books-page.pug")( {books: librarian.books.filter (
			(book) => {
				if (!book.returnDate)
					return false;
				return (Date.parse(book.returnDate) > Date.now());
			}
		)}));

		next();
	} else {
		res.redirect('/authorization');
	}
});

router.get('/library/table-outdated', (req, res, next) => {
	if (req.user) {
		console.log("Got GET request at /library/table-outdated");

		res.send(pug.compileFile("./src/views/books-page.pug")( {books: librarian.books.filter (
			(book) => {
				if (!book.returnDate)
					return false;
				return (Date.parse(book.returnDate) <= Date.now());
			}
		)}));

		next();
	} else {
		res.redirect('/authorization');
	}
});

router.post('/library/before-date-sort', (req, res, next) => {
	if (req.user) {
		console.log("Got GET request at /library/before-date-sort");
		console.log(req.body);

		res.send(pug.compileFile("./src/views/books-page.pug")( {books: librarian.books.filter (
			(book) => {
				if (!book.returnDate)
					return false;
				// return (Date.parse(book.returnDate) <= Date.now());
				let bookReturnDate = new Date(Date.parse(book.returnDate));
				if (bookReturnDate.getFullYear() < req.body["year"]) {
					return true;
				} else if (bookReturnDate.getFullYear === req.body["year"]) {
					if (bookReturnDate.month < req.body["month"]) {
						return true;
					} else if (bookReturnDate.day <= req.body["day"]) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			}
		)}));

		next();
	} else {
		res.redirect('/authorization');
	}
});

router.delete('/library', (req, res, next) => {
	if (req.user) {
		console.log("Got DELETE request");
		console.log(req.body, req.body.id);
		librarian.removeBook(req.body.id);
		res.status(200);
		res.send();
		next();
	} else {
		res.redirect('/authorization');
	}
});

router.put('/library', (req, res, next) => {
	if (req.user) {
		console.log("Got PUT request");
		console.log("Request body: ", req.body);
		book = req.body;
		librarian.changeBook(book.id, book.title, book.author, book.date);
	} else {
		res.redirect('/authorization');
	}
});

router.post('/library', (req, res, next) => {
	if (req.user) {
		console.log("Got POST request");
		console.log("Request body: ", req.body);
		book = req.body;
		librarian.addBook(book.title, book.author, book.date);
		res.status(200);
		res.send();
		next();
	} else {
		res.redirect('/authorization');
	}
});

router.put('/library/give', (req, res, next) => {
	if (req.user) {
		console.log("Got PUT request at library/give");
		console.log("Request body: ", req.body);
		book = req.body;
		librarian.giveBook(book.id, book.owner, book.returnDate);
	} else {
		res.redirect('/authorization');
	}
});

router.put('/library/return', (req, res, next) => {
	if (req.user) {
		console.log("Got PUT request at library/return");
		console.log("Request body: ", req.body);
		book = req.body;
		librarian.returnBook(book.id, book.owner, book.returnDate);
	} else {
		res.redirect('/authorization');
	}
});

router.get("/library/:num", (req, res, next) => {
	if (req.user) {
		const id = req.params.num;
		console.log(`Got GET request of book with ${id} id:`);
		for (value of librarian.books) {
			if (value.id == id) {
				// send information about the book
				res.send(value);
			}
		}

		next();
	} else {
		res.redirect('/authorization');
	}
});

router.get("/books/:num", (req, res, next) => {
	if (req.user) {
		const id = req.params.num;
		console.log(`Got GET request of book with ${id} id:`);
		for (value of librarian.books) {
			if (value.id == id) {
				res.send(pug.compileFile("./src/views/books-page.pug")( { books: librarian.books.filter (
					(book) => {
						return (book.id === value.id)
					}
				)}));
			}
		}

		next();
	} else {
		res.redirect('/authorization');
	}
});

module.exports = router;