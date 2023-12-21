const express = require('express');
const session = require('express-session');
const lends = require('./lends');
const books = require('./books');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = 3000;

//Middleware um JSON zu Lesen laden, um an die Endpunkte jsondaten
app.use(express.json());
app.use(
	session({
		secret: 'supersecret',
		resave: false,
		saveUninitialized: true,
		cookie: {},
	})
);
app.get('/', function (request, response, _) {
	// request.session is the object that holds the information of this specific session
	request.session.views = (request.session.views || 0) + 1;
	console.log(request.session);

	response.end(request.session.views + ' views');
});
app.use(
	'/books',
	books
	// #swagger.tags = ['Books']
);

app.use(
	'/lends',
	lends
	// #swagger.tags = ['Lends']
);

//Generatet with ChatGPT

app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
	console.log(`Bookstore app listening on port ${port}`);
});
