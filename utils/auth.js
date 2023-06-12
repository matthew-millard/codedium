// Middleware to check if the user is authenticated

const withAuth = (req, res, next) => {
  // Checks if the user is authenticated
  if (!req.session.loggedIn) {
    return res
      .status(401)
      .json({ message: 'You must be logged in to view this page' });
  } else {
    next();
  }
};

module.exports = withAuth;
