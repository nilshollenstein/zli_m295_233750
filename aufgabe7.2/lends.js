const express = require('express');
const router = express.Router();
const { randomUUID } = require('crypto');
const books = require('./bookList');
const verification = require('./verification');

let lends = [];

router.get('/', (req, res) => {
	// #swagger.summary = 'Get all lends'
	res.send(lends);
});
router.get('/:id', (req, res) => {
	// #swagger.summary = 'Get a specific lend'
	res.send(lends.find((lend) => lend.id === req.params.id));
});
router.post('/', (req, res) => {
	// #swagger.summary = 'Add a new lend'
	const newLend = req.body;
	const isbn = req.body.isbn;
	newLend['id'] = randomUUID();
	newLend['borrowed_at'] = new Date().toISOString();
	newLend['returned_at'] = null;

	if (!books.some((book) => book.isbn === isbn)) {
		return res.status(404).send('Buch nicht gefunden');
	}
	if (lends.some((lend) => lend.isbn === isbn)) {
		return res.status(409).send('Buch bereits ausgeliehen');
	}
	if (!newLend['isbn'] || !newLend['customer_id']) {
		return res.status(422).send('isbn und customer_id werden benötigt!');
	}

	const lendsByCustomer = lends.filter(
		(lend) =>
			lend['customer_id'] === newLend['customer_id'] &&
			!lend['returned_at']
	);

	if (lendsByCustomer.length >= 3) {
		return res.status(400).send('Customer has too many active lends.');
	}

	lends = [...lends, req.body];
	res.status(201).send(lends);
});

router.delete('/:id', (req, res) => {
	// #swagger.summary = 'Return a book'
	const returnedLend = lends.find((lend) => lend.id === req.params.id);
	returnedLend['returned_at'] = new Date().toISOString();
	res.status(204).send(lends);
});

module.exports = router;
