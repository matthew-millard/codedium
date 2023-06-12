const commentForm = document.querySelector('.comment-form');
const commentTextarea = commentForm.querySelector('.comment-textarea');

// Function to post user's comment
const commentFormHandler = async (event) => {
  event.preventDefault();
  try {
    // Collect value from textarea
    const newComment = commentTextarea.value.trim();
    console.log('hi');

    // Collect post id from data attribute
    const postId = commentForm.getAttribute('data-id');

    // Collect author id from data attribute
    const author_id = commentForm.getAttribute('data-author');

    // Clear textarea value
    commentTextarea.value = '';

    // Check comment is not empty
    if (newComment) {
      // Package up and post comment to database
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          comment_body: newComment,
          blog_id: postId,
          author_id: author_id,
        }),
        headers: { 'content-type': 'application/json' },
      });

      // If unsuccessful, alert user
      if (response.status === 401) {
        alert('You must be logged in to comment');
      }

      // If successful, update page to display new comment.
      if (response.status === 200) {
        document.location.reload();
      }
    }
  } catch (err) {
    console.error(err);
  }
};

// Event Handlers
commentForm.addEventListener('submit', commentFormHandler);
