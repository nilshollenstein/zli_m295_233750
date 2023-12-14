const express = require('express');
const { stringify } = require('querystring');
const app = express();
const port = 3000;
let date = new Date();
let hour = date.getHours() + 1;
let minute = date.getMinutes();
let seconds = date.getSeconds();

app.get('/now', (request, response) => {
	response.send(`Time: ${hour}:${minute}:${seconds}`);
});
app.get('/zli', (request, response) => {
	response.redirect(301, 'https://www.zli.ch/');
});
const names = [
	'Alice',
	'Bob',
	'Charlie',
	'David',
	'Emma',
	'Frank',
	'Grace',
	'Henry',
	'Ivy',
	'Jack',
	'Katie',
	'Liam',
	'Mia',
	'Noah',
	'Olivia',
	'Paul',
	'Quinn',
	'Rachel',
	'Samuel',
	'Tina',
];
app.get('/name', (request, response) => {
	let randomnumber = Math.round(Math.random() * names.length);
	response.send(names[randomnumber]);
});
app.get('/html', (request, response) => {
	response.sendFile(__dirname + '/index.html');
});
app.get('/image', (request, response) => {
	response.sendFile(__dirname + '/image.jpg');
});
app.get('/teapot', (request, response) => {
	response.status(418).send('418 Teapot');
});
app.get('/user-agent', (request, response) => {
	let agent = request.headers['user-agent'];
	response.send(agent);
});
app.get('/secret', (request, response) => {
	response.status(403).send();
});

app.get('/xml', (request, response) => {
	response.sendFile(__dirname + '/index.xml'); //Von einer Seite
});
app.get('/me', (request, response) => {
	const me = {
		firstname: 'Nils',
		lastname: 'Hollenstein',
		age: 15,
		residence: 'Seuzach',
		eyecolor: 'Blue',
	};
	let jsonme = JSON.stringify(me);
	response.send(jsonme);
});
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
