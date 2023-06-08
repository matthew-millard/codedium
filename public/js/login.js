// Select elements
const signupForm = document.querySelector('.form-sign-up');

// Function to handle the sign-up form
const signupFormHandler = async (event) => {
  event.preventDefault();
  try {
    // Collect values from the sign-up form
    const username = document.querySelector('#username-sign-up').value.trim();
    const password = document.querySelector('#password-sign-up').value.trim();

    // Checks if username and password are not empty
    if (username && password) {
      const response = await fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'content-type': 'application/json' },
      });
      // If successful, redirect the browser to the profile page
      if (response.ok) {
        document.location.replace('/');
      } else {
        console.log('failed');
        alert(response.statusText);
      }
    }
  } catch (err) {
    return console.error(err);
  }
};

// Event Handlers
signupForm.addEventListener('submit', signupFormHandler);
