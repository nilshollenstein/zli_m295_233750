const express = require('express');
const app = express();
const port = 3000;

function getCurrentTimeInTimezone(timezone) {
	const options = {
		timeZone: timezone,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		timeZoneName: 'short',
	};
	const formattedTime = new Date().toLocaleString('en-US', options);
	return formattedTime;
}

app.get('/now', (req, res) => {
	const defaultTimezone = 'UTC';

	const timezoneParam = req.query.tz || defaultTimezone;

	const currentTime = getCurrentTimeInTimezone(timezoneParam);

	res.send(`Aktuelle Zeit: ${currentTime}`);
});
let namesList = [];

app.use(express.urlencoded({ extended: true }));
app.post('/names', (req, res) => {
	namesList.push(req.body.name);

	console.log(namesList);
	res.send(JSON.stringify(namesList));
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
