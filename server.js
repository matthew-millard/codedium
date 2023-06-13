// Imports
const express = require('express');
const sequelize = require('./config/connection');
const session = require('express-session');
const exphb = require('express-handlebars');
const routes = require('./controllers');
const path = require('path');
const formatDate = require('./helpers/formatDate');
require('dotenv').config();

const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Port
const PORT = process.env.PORT || 3001;

// Create express application
const app = express();

// Create instance of express handlebars engine with custom helpers
const hbs = exphb.create({
  helpers: {
    formatDate,
  },
});

const sess = {
  secret: process.env.SESSION_SECRET, // This is the secret used to sign the session ID cookie
  cookie: {
    maxAge: 300000, // Max age in milliseconds until cookie expires, 5 minutes
    httpOnly: true, // The cookie will not be accessible through client side script
    secure: false, // This indicates whether the cookie should be sent over secure connections only (HTTPS)
    sameSite: 'strict', // This prevents the browser from sending this cookie along with cross-site requests
  },
  resave: false, // This forces the session to be saved back to the session store
  saveUninitialized: true, // This forces a session that is "uninitialized" to be saved to the store
  rolling: true, // Resets the maxAge on every user response
  store: new SequelizeStore({
    // This is a session store instance.
    db: sequelize, // This is the Sequelize instance that will be used to connect to the database
  }),
};

app.use(session(sess)); // The session middleware will populate req.session

// Register the handlebars instance hbs as the view engine for files with the extension .handlebars
app.engine('handlebars', hbs.engine);
// Set handlebars to default view engine
app.set('view engine', 'handlebars');
// Sets the views directory to a folder named 'views'
app.set('views', path.join(__dirname, './views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(routes);

// Start server
const startServer = async () => {
  try {
    await sequelize.sync({ force: false });
    app.listen(PORT, () =>
      console.log(`Application listening on port:${PORT} 🚀`)
    );
  } catch (err) {
    console.error(`An error occurred while starting the server:`, err);
  }
};

startServer();
