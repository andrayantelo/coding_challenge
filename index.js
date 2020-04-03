const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const path = require('path');
const winston = require('winston');
// database storing user comments
const db = require('./db.js');

const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

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

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

// Configure templating engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');
nunjucks.configure(app.get('views'), {
	autoescape: true,
	express: app,
});

const renderComments = () => {
	return nunjucks.render('comments.njk', { comments: db.get() });
};
  

app.get('/', (request, response) => {
	const options = {
		pageTitle: 'Homepage',
		logo: { url: 'assets/logo.png', description: 'Kink.com logo' },
		upperimg: { url: 'assets/placeholder.png', description: 'Narwal with ball gag.' },
		commentsHTML: renderComments()
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
	
	const commentsHTML = renderComments();
	return response.send({commentsHTML, msg});
});

app.listen(PORT, () => {
	logger.log({ level: 'info', message: `listening on ${PORT}` });
});
