const express = require('express')
const router = express.Router()


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
	const newLend ={ ...req.body };//Es wird der Body geklont
	let checkISBN = req.body.isbn;
	newLend.borrowed_at = null;
	


	if (
			!req.body.customer_id ||
			!req.body.isbn	
	) {
		return res.status(422).send();
		//If für die Prüfung, ob ein Nutzer bereits drei Ausleihen hat
	}  
	if (lends.some((lend) => lend.isbn === checkISBN)) {
		const lendWithISBN = lends.find((lend) => lend.isbn === checkISBN);
		if (lendWithISBN.returned_at === '') {
			console.log(409);
			return res.status(409).send('Buch ist noch nicht Zurückgegeben');
		}
	}
	const lendsByCustomer = lends.filter((lend)=>lend.customer_id === newLend.customer_id&&lend.returned_at)

	if(lendsByCustomer.length >= 3){
		return res.status(400).send("Kunde hat mehr als drei Ausleihen")
	}

	
	newLend.id = randomUUID();
	newLend.borrowed_at = new Date()
		
	lends.push(newLend);
	console.log(lends);
	return res.status(201).send(lends);
	
});


router.patch('/:id', (req, res) => {
	// #swagger.summary = 'Return a book'
	const idLendtoUpdate = req.params.id;
	const lendToUpdate = lends.find((lend) => lend.id === idLendtoUpdate);

	if (req.body.returned_at !== undefined) {
		lendToUpdate.returned_at = new Date();
		res.send(lends);
		console.log(lends);
	}
});

module.exports = router;