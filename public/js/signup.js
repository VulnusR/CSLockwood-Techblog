document
  .querySelector('#signup-button')
  .addEventListener('click', async (event) => {
    event.preventDefault();

    console.log(event);


    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();


    if (username && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      console.log(response)


      if (response.ok) {
        document.location.assign('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  });