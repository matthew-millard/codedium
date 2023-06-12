// Imports
const router = require('express').Router();
const { User, BlogPost, Comment } = require('../../models');
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
    console.log(post);

    // Fetch comments
    const commentsData = await Comment.findAll({
      where: { blog_id: postId },
      include: [{ model: User }],
    });

    // Serialize data so the template can read it
    comments = commentsData.map((comment) => comment.get({ plain: true }));

    // Render post
    return res
      .status(200)
      .render('post', { post, comments, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    return res.status(200).json({ message: 'Server Error' });
  }
});

// Exports
module.exports = router;
