const express = require('express');
const router = express.Router();
let books = require('./bookList');

router.get('/', (req, res) => {
	// #swagger.summary = 'Get all books'
	res.send(books);
});

router.get('/:isbn', (req, res) => {
	// #swagger.summary = 'Get a specific book'
	res.send(books.find((book) => book.isbn === req.params.isbn));
});
router.post('/', (req, res) => {
	// #swagger.summary = 'Add a new book'
	if (
		!req.body.isbn ||
		!req.body.title ||
		!req.body.year ||
		!req.body.author
	) {
		return res.status(422).send('Titel darf nicht leer sein');
	}

	books.push(req.body);
	res.status(201).send(books);
});
router.put('/:isbn', (req, res) => {
	// #swagger.summary = 'Change the Informations of a book'
	const isbnToUpdate = req.params.isbn;

	books = books.map((book) =>
		book.isbn === isbnToUpdate ? { ...book, ...req.body } : book
	);

	res.send(books);
});

router.delete('/:isbn', (req, res) => {
	// #swagger.summary = 'Delete a Book'
	//Filtert alle ausser das, dass man löschen will in neuen Array
	let book = books.filter((book) => book.isbn !== req.params.isbn);
	//weisst dem alten Array den neuen zu
	books = book;
	res.status(204).send(books);
});

module.exports = router;
