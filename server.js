// Imports
const express = require('express');
const sequelize = require('./config/connection');
const exphb = require('express-handlebars');
const routes = require('./controllers/index');
const path = require('path');

// Port
const PORT = process.env.PORT || 3001;

// Create express application
const app = express();

// Create instance of express handlebars engine
const hbs = exphb.create({});
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
    await sequelize.sync({ force: true });
    app.listen(PORT, () =>
      console.log(`Application listening on port:${PORT} 🚀`)
    );
  } catch (err) {
    console.error(`An error occurred while starting the server:`, err);
  }
};

startServer();
