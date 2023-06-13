// Imports
const router = require('express').Router();
const { User, BlogPost, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new post page
router.post('/new', withAuth, async (req, res) => {
  try {
    const { blog_title, blog_body } = req.body;

    // Validate input
    if (!blog_title || !blog_body) {
      return res
        .status(400)
        .json({ message: 'Please enter a title and content' });
    }

    // Create a new blog post
    const newBlogPost = await BlogPost.create({
      blog_title,
      blog_body,
      author_id: req.session.user_id,
    });

    return res.status(200).json(newBlogPost);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/new', withAuth, async (req, res) => {
  console.log('Hit new post route');
  try {
    return res
      .status(200)
      .render('new-post', { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

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

// Update a post page
router.get('/update/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;

    // Fetch blog post by id
    const postData = await BlogPost.findByPk(postId, {
      include: [{ model: User }],
    });

    // Serialize data
    post = postData.get({ plain: true });

    // Render post
    return res
      .status(200)
      .render('update-post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    return res.status(200).json({ message: 'Server Error' });
  }
});

// Update a post
router.put('/update/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const { blog_title, blog_body } = req.body;

    // Validate input
    if (!blog_title || !blog_body) {
      return res
        .status(400)
        .json({ message: 'Please enter a title and content' });
    }

    // Update blog post
    const updatedBlogPost = await BlogPost.update(
      {
        blog_title,
        blog_body,
      },
      {
        where: { id: postId },
      }
    );

    return res.status(200).json(updatedBlogPost);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a post
router.delete('/delete/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;

    // Delete blog post
    const deletedBlogPost = await BlogPost.destroy({
      where: { id: postId },
    });

    return res.status(200).json(deletedBlogPost);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Exports
module.exports = router;
