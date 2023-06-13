const blogForm = document.querySelector('.new-blog-form');
const blogTitle = blogForm.querySelector('[name="blog_title"]');
const blogBody = blogForm.querySelector('[name="blog_body"]');
const deleteBtn = document.querySelector('.delete-btn');

// Update a blog post
const updateBlogFormHandler = async (event) => {
  event.preventDefault();
  try {
    // Collect values from the login form
    const blog_title = blogTitle.value.trim();
    const blog_body = blogBody.value.trim();
    const id = blogForm.getAttribute('data-id');

    // Check if blog title and body exist
    if (blog_title && blog_body) {
      const response = await fetch(`/api/posts/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ blog_title, blog_body }),
        headers: { 'Content-Type': 'application/json' },
      });

      //   Check the response status
      if (response.status === 200) {
        return document.location.replace('/dashboard');
      } else {
        return console.error(response.statusText);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

// Delete a blog post
const deleteBlogPostHandler = async (event) => {
  event.preventDefault();
  try {
    const id = blogForm.getAttribute('data-id');
    const response = await fetch(`/api/posts/delete/${id}`, {
      method: 'DELETE',
    });

    // Check the response status
    if (response.status === 200) {
      return document.location.replace('/dashboard');
    } else {
      return console.error(response.statusText);
    }
  } catch (err) {
    console.error(err);
  }
};

// Event Handlers
blogForm.addEventListener('submit', updateBlogFormHandler);
deleteBtn.addEventListener('click', deleteBlogPostHandler);
