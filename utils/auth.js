// Middleware to check if the user is authenticated

const withAuth = (req, res, next) => {
  // Checks if the user is authenticated
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
