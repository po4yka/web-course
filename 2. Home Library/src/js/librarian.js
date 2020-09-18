class Librarian {
	/**
	 * Save library to the JSON
	 */
	saveBooks() {
		let fs = require("fs");
		fs.writeFile('library.json', JSON.stringify(this.books), (err) => {
			if (err) {
				console.log("Error during file saving:", err);
			}
		});
    }

    loadBooks() {
		try {
			// Here, we're using the require() method to read in
			// a file without an obvious file extension
			this.books = require("../../library.json");
		} catch(e) {
			if (e.code == 'MODULE_NOT_FOUND') {
				this.books = [];
				let fs = require("fs");
				saveBooks();
				console.log("No library file on server, new lib file was created.");
			} else {
				console.log(e);
			}
			return;
		}

		// console.log("Loaded books:");
		// console.log(this.books);
    }
	
	/**
	 * Change book par in library
	 */
	changeBook(id, title, author, date) {
		this.books[id].title = title;
		this.books[id].author = author;
		this.books[id].date = date;
		this.saveBooks();
    }
	
	/**
	 * Add new book to the existring library
	 * @param {string} title 
	 * @param {string} author 
	 * @param {*} date 
	 */
	addBook(title, author, date) {
		let id;
		if (this.books.length > 0) {
		 	id = this.books[this.books.length - 1].id + 1
		} else {
			id = 1;
		}
		this.books[this.books.length] = {
			id: id,
			author: author,
			title: title,
			date: date,
			owner: null,
			returnDate: null
		};

		this.saveBooks();
    }
	
	/**
	 * Set information about book giving to somebody
	 */
	giveBook(id, user, until) {
		for (value of this.books) {
			if (value.id == id) {
				value.owner = user;
				value.returnDate = until;
				console.log(`Book with ${id} id was given to: ${value}`);
				this.saveBooks();
			}
		}
    }
	
	/**
	 * Set given book par of returned
	 * @param {number} id 
	 */
	returnBook(id) {
		for (value of this.books) {
			if (value.id == id) {
				value.owner = null;
				value.returnDate = null;
				this.saveBooks();
				return;
			}
		}
		console.log(`Incorrect book returning for: ${id} id`);
    }
	
	/**
	 * Remove existing book from 
	 * @param {number} id 
	 */
	removeBook(id) {
		console.log(`Remove book with: ${id} id`);
		for (let i = 0; i < this.books.length; i += 1) {
			if (this.books[i].id == id) {
				this.books.splice(i, 1);
				this.saveBooks();
			}
		}
	}
};

librarian = new Librarian();
librarian.loadBooks();

module.exports = librarian;