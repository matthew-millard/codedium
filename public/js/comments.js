document.addEventListener('DOMContentLoaded', () => {
  const commentForm = document.querySelector('.comment-form');

  commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Testing!!');
  });
});
