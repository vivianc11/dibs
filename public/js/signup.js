const signupFormHandler = async (event) => {
  event.preventDefault();
    
  const email = document.querySelector('#email-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
    // console.log(username);
    // console.log(password);
  
    if (username && password && email) {
      const response = await fetch('/api/giver/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password, email}),
        headers: { 'Content-Type': 'application/json' },
      });
      // console.log("fetch test two");
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);