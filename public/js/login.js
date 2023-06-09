// Select elements
const loginForm = document.querySelector('.form-login');
const signupForm = document.querySelector('.form-sign-up');
const loginLink = document.querySelector('a[href="/login"]');

// Function to handle the login form
const loginFormHandler = async (event) => {
  event.preventDefault();

  try {
    // Collect values from login form
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    // Checks if username and password are not empty
    if (username && password) {
      const response = await fetch('api/users/login/', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'content-type': 'application/json' },
      });
      // If successful, redirect the browser to the homepage
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        return document.location.replace('/');
      } else {
        return alert(response.statusText);
      }
    }
  } catch (err) {
    return console.error(err);
  }
};

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
      // If successful, redirect the browser to the homepage
      if (response.ok) {
        return document.location.replace('/');
      } else {
        return alert(response.statusText);
      }
    }
  } catch (err) {
    return console.error(err);
  }
};

// Event Handlers
loginForm.addEventListener('submit', loginFormHandler);
signupForm.addEventListener('submit', signupFormHandler);
