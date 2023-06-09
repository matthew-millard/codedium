// Imports
const router = require('express').Router();
const { User, BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

// Get a specific post
router.get('/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    // Fetch blog post by id
    const postData = await BlogPost.findByPk(postId, {
      include: [{ model: User }],
    });

    // Serialize data so the template can read it
    post = postData.get({ plain: true });

    // Render post
    return res
      .status(200)
      .render('post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    return res.status(200).json({ message: 'Server Error' });
  }
});

// Exports
module.exports = router;
