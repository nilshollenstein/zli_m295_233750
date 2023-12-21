const express = require('express');
const router = express.Router();
const session = require('express-session');

const secretAdminCredentials = {
	email: 'desk@library.example',
	password: 'm295',
};
router.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	//Überprüfen der Logindaten
	if (
		email?.toLowerCase() === secretAdminCredentials.email &&
		password === secretAdminCredentials.password
	) {
		//req.session.email setzt den Nutzer auf eingeloggt
		req.session.email = email;
		return res.status(201).json({ email: req.session.email });
	}
	return res.status(401).json({ error: 'Ungültige Logindaten' });
});

router.get('/verify', function (req, res) {
	if (req.session.email) {
		return res.status(200).json({ email: req.session.email });
	}

	return res.status(401).json({ error: 'Not logged in' });
});
router.delete('/logout', function (req, res) {
	// Check if email is set in session
	if (req.session.email) {
		// Reset link of session to email
		req.session.email = null;

		return res.status(204).send();
	}

	return res.status(401).json({ error: 'Not logged in' });
});
module.exports = router;
