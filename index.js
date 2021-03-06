const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const path = require('path');
const winston = require('winston');
// database storing user comments
const db = require('./db.js');

const PORT = 3000;

const logger = winston.createLogger({
	transports: [new (winston.transports.Console)()],
});

const app = express();

// Static assets.
app.use(express.static(path.join(__dirname, 'public')));

// Logger.
app.use(morgan(':method :url :status :response-time ms', {
	stream: {
		write: message => logger.info(message.trim()),
	},
}));

// for parsing application/x-www-form-urlencoded
// lets express know how to take the urlencoded
// form data and turn it into a javascript object
app.use(express.urlencoded({ extended: true }));

// Configure templating engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');
nunjucks.configure(app.get('views'), {
	autoescape: true,
	express: app,
});

app.get('/', (request, response) => {
	const options = {
		pageTitle: 'Homepage',
		logo: { url: 'assets/logo.png', description: 'Kink.com logo' },
		upperimg: { url: 'assets/placeholder.png', description: 'Narwal with ball gag.' },
		comments: db.get(),
	};
	return response.render('home', options);
});

// Add a user submitted comment to the database.
// Log error and ignore if comment is incomplete.
app.post('/addComment', (request, response) => {
	const comment = request.body.comment;
	const username = request.body.username;

	let msg = db.add({ username, comment });
	if (msg) {
		logger.error(msg);
		msg = 'There was an error.';
	} else {
		msg = 'Thanks for commenting!';
	}
	return response.redirect(`/?message= + ${msg}`);
});

app.listen(PORT, () => {
	logger.log({ level: 'info', message: `listening on ${PORT}` });
});
