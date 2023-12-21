const express = require('express')
const router = express.Router()

let books = [
	{
		isbn: '9780345803481',
		title: '1984',
		year: '1949',
		author: 'George Orwell',
	},
	{
		isbn: '9780061120084',
		title: 'To Kill a Mockingbird',
		year: '1960',
		author: 'Harper Lee',
	},
	{
		isbn: '9781400033423',
		title: 'The Great Gatsby',
		year: '1925',
		author: 'F. Scott Fitzgerald',
	},
	{
		isbn: '9780743273565',
		title: 'The Catcher in the Rye',
		year: '1951',
		author: 'J.D. Salinger',
	},
	{
		isbn: '9780060935467',
		title: 'One Hundred Years of Solitude',
		year: '1967',
		author: 'Gabriel Garcia Marquez',
	},
	{
		isbn: '9780141182551',
		title: 'Brave New World',
		year: '1932',
		author: 'Aldous Huxley',
	},
	{
		isbn: '9780062315007',
		title: 'The Fault in Our Stars',
		year: '2012',
		author: 'John Green',
	},
	{
		isbn: '9780140449334',
		title: 'Pride and Prejudice',
		year: '1813',
		author: 'Jane Austen',
	},
	{
		isbn: '9780060850524',
		title: 'The Hobbit',
		year: '1937',
		author: 'J.R.R. Tolkien',
	},
	{
		isbn: '9780451524935',
		title: 'Fahrenheit 451',
		year: '1953',
		author: 'Ray Bradbury',
	},
];

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
		!req.body.isbn || !req.body.title || !req.body.year || !req.body.author
	) {
		return res.status(422).send();
	}
	books.push(req.body);
	console.log(books);
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
	res.send(books);
});

module.exports = router;