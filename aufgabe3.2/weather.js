const request = require('request');

module.exports = function (url, callback) {
	request.get(
		{
			url: url,
			json: true,
			headers: { 'User-Agent': 'request' },
		},
		(err, res, data) => {
			//Error, Response(Statuscodes), Daten
			if (err) {
				callback(err);
			} else if (res.statusCode !== 200) {
				console.log('Status:', res.statusCode); // Ausgeben des Statuscodes
			} else {
				callback(false, data); // Zurückgeben der Daten, Aufruf von der Callbackfunktion, false, damit es nicht denkt, dass es einen Error hat
			}
		}
	);
};
