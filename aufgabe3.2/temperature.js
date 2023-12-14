const express = require('express');
const weather = require('./weather.js');
const app = express();
const port = 3000;

app.get('/:plz', (request, response) => {
	//Parameter wird hinzugefügt
	const plz = request.params.plz; //Parameter wird gespeichert
	const url = `https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${plz}00`;
	weather(url, function (err, data) {
		if (err) {
			response.status(err).send(err);
		}

		response.send('Temperatur: ' + String(data.currentWeather.temperature));
	});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
