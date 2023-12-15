const express = require('express');

const app = express();
const port = 3000;

//Middleware um JSON zu Lesen laden, um an die Endpunkte jsondaten
app.use(express.json());
//Generatet with ChatGPT
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

let lends = [
	{
		id: '1',
		customer_id: '4528',
		isbn: '9780345803481',
		borrowed_at: '12.03.2012',
		returned_at: '12.04.2012',
	},
	{
		id: '2',
		customer_id: '7890',
		isbn: '9780061120084',
		borrowed_at: '15.05.2013',
		returned_at: '25.05.2013', // Hinzugefügt
	},
	{
		id: '3',
		customer_id: '1234',
		isbn: '9781400033423',
		borrowed_at: '22.08.2014',
		returned_at: '',
	},
	{
		id: '4',
		customer_id: '5678',
		isbn: '9780743273565',
		borrowed_at: '01.01.2015',
		returned_at: '15.01.2015', // Hinzugefügt
	},
	{
		id: '5',
		customer_id: '9012',
		isbn: '9780062315007',
		borrowed_at: '10.06.2016',
		returned_at: '',
	},
];

app.get('/books', (req, res) => {
	res.send(books);
});
app.get('/lends', (req, res) => {
	res.send(lends);
});
app.get('/lends/:id', (req, res) => {
	res.send(lends.find((lend) => lend.id === req.params.id));
});
app.get('/books/:isbn', (req, res) => {
	res.send(books.find((book) => book.isbn === req.params.isbn));
});

app.post('/books', (req, res) => {
	if (
		!(req.body.isbn && req.body.title && req.body.year && req, body.author)
	) {
		return res.status(422).send();
	}
	books.push(req.body);
	console.log(books);
	res.status(201).send(books);
});
app.post('/lends', (req, res) => {
	let checkISBN = req.body.isbn;
	const userLends = lends.filter(
		(lend) =>
			lend.customer_id === req.body.customer_id && lend.returned_at === ''
	);

	if (
		!(
			req.body.id &&
			req.body.customer_id &&
			req.body.isbn &&
			req.body.borrowed_at
		)
	) {
		console.log(422);
		return res.status(422).send();
	}
	//Filter mithilfe von ChatGPT
	else if (userLends.length >= 3) {
		console.log(403);
		return res.status(403).send('Nutzer hat bereits drei Ausleihen');
	} else if (lends.some((lend) => lend.isbn === checkISBN)) {
		const lendWithISBN = lends.find((lend) => lend.isbn === checkISBN);

		if (lendWithISBN.returned_at === '') {
			console.log(409);
			return res.status(409).send('Conflict: Book is not returned yet.');
		}
	} else {
		lends.push(req.body);
		console.log(lends);
		return res.status(201).send(lends);
	}
});

app.put('/books/:isbn', (req, res) => {
	const isbnToUpdate = req.params.isbn;

	books = books.map((book) =>
		book.isbn === isbnToUpdate ? { ...book, ...req.body } : book
	);

	res.send(books);
});
app.patch('/lends/:id', (req, res) => {
	const idLendtoUpdate = req.params.id;
	const lendToUpdate = lends.find((lend) => lend.id === idLendtoUpdate);

	if (req.body.returned_at !== undefined) {
		lendToUpdate.returned_at = req.body.returned_at;
		res.send(lends);
		console.log(lends);
	}
});
app.delete('/books/:isbn', (req, res) => {
	//Filtert alle ausser das, dass man löschen will in neuen Array
	let book = books.filter((book) => book.isbn !== req.params.isbn);
	//weisst dem alten Array den neuen zu
	books = book;
	res.send(books);
});
app.listen(port, () => {
	console.log(`Bookstore app listening on port ${port}`);
});
