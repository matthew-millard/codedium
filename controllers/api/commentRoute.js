// Imports
const comment = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Retreive users blog comment and save to database if user is logged in
comment.post('/', withAuth, async (req, res) => {
  try {
    // Collect author id from session
    const author_id = req.session.user_id;

    // Collect comment body and blog id from request body
    const { comment_body, blog_id } = req.body;

    // Create the comment in the database
    const newComment = await Comment.create({
      comment_body,
      author_id,
      blog_id,
    });

    // If unsuccessful, return error
    if (!newComment) {
      return res.status(400).json({ message: 'Unable to create comment' });
    }

    // If successful, return status 200 and success message
    return res.status(200).json({ message: 'Comment created successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Exports
module.exports = comment;
