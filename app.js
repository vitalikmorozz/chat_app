if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const morgan = require('morgan');
const flash = require('express-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');

const PORT = 3000 || process.env.PORT;

// Ejs, layout and static files configuration
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Load passport config
require('./config/passportConfig')(passport);

// Using express-flash to show messages
app.use(flash());

// To handle form inputs parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use express-session to store info about user locally in session
app.use(
	session({
		name: 'Session name',
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { secure: false, maxAge: 1000000, sameSite: true },
	})
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Always pass user to ejs
app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});

// Connect to MongoDB using Mongoose and MongoDB Atlas
mongoose.connect(
	process.env.MONGO_DB_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) console.log(`MongoDB connection failed! Error: ${err}`);
		else console.log('MongoDB connected successfully');
	}
);

// Mongoose deprecation warning fixes
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// Routes handle
app.use('', require('./routes/auth'));
app.use('/chat', require('./routes/chatRouter'));
app.use('/user', require('./routes/user'));

app.get('/', (req, res) => {
	res.render('main');
});

// Socket.io logic
require('./socket/main')(io);

server.listen(PORT, () => {
	console.log(`Server is up and listening on port ${PORT}`);
});
