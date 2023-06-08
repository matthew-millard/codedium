// Imports
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers/index');

// Port
const PORT = process.env.PORT || 3001;

// Create express application
const app = express();

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
