const newBlogForm = document.querySelector('.new-blog-form');
const newBlogTitle = newBlogForm.querySelector('[name="blog_title"]');
const newBlogContent = newBlogForm.querySelector('[name="blog_body"]');

const newBlogFormHandler = async (event) => {
  event.preventDefault();
  try {
    // Collect values from the login form
    const blog_title = newBlogTitle.value.trim();
    const blog_body = newBlogContent.value.trim();

    // Check if blog title and body exist
    if (blog_title && blog_body) {
      const response = await fetch('/api/posts/new', {
        method: 'POST',
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

// Event listeners
newBlogForm.addEventListener('submit', newBlogFormHandler);
