const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  // console.log(username);
  // console.log(password);

    //If we have both name and password, then can login
    if (username && password) {
    // Send a POST request to the API endpoint
    
    const response = await fetch('/api/giver/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    // console.log("fetch test");
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
    }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);