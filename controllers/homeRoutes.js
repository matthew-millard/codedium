// Imports
const home = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

home.get('/', async (req, res) => {
  try {
    // Get all blog posts
    const blogPostData = await BlogPost.findAll({
      include: [{ model: User }],
    });

    // Serialize data so the template can read it
    const blogs = blogPostData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    return res.render('home', { blogs, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Login Route
home.get('/login', async (req, res) => {
  try {
    return res.status(200).render('login', { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Dashboard Route
home.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Collect user id from session
    const author_id = req.session.user_id;
    console.log(author_id);

    // Get all blog posts by user id
    const blogPostData = await BlogPost.findAll({
      where: { author_id },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'], // Exclude password from user attributes
          },
        },
      ],
    });

    // Serialize data
    const blogs = blogPostData.map((blog) => blog.get({ plain: true }));

    return res
      .status(200)
      .render('dashboard', { blogs, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Logout Route
home.get('/logout', async (req, res) => {
  try {
    // Destroy session
    req.session.destroy();

    // Redirect to homepage
    return res.status(200).redirect('/');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Exports
module.exports = home;
