// Select elements
const loginForm = document.querySelector('.form-login');
const signupForm = document.querySelector('.form-sign-up');
const loginLink = document.querySelector('a[href="/login"]');

// Show Error Messages Function
function displayErrorMessage(errorMessage) {
  const errorMessageContainer = document.querySelector(
    '.error-message-container'
  );
  errorMessageContainer.innerHTML = '';
  errorMessageContainer.classList.remove('display-none');
  const errorMessageElement = document.createElement('small');

  errorMessageElement.textContent = errorMessage;
  errorMessageElement.classList.add('error-message');

  errorMessageContainer.appendChild(errorMessageElement);
}

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
      // If successful, redirect the browser to the dashboard
      if (response.ok) {
        return document.location.replace('/dashboard');
      } else {
        const message = await response.json();
        displayErrorMessage(message.message);
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
      const response = await fetch('/api/users/sign-up', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'content-type': 'application/json' },
      });
      // If successful, redirect the browser to the dashboard
      if (response.ok) {
        return document.location.replace('/dashboard');
      } else {
        const message = await response.json();
        displayErrorMessage(message.message);
      }
    } else {
      const message = 'Please enter both a username and password.';
      displayErrorMessage(message);
    }
  } catch (err) {
    return console.error(err);
  }
};

// Event Handlers
loginForm.addEventListener('submit', loginFormHandler);
signupForm.addEventListener('submit', signupFormHandler);
