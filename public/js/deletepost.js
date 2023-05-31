document
  .querySelector('#delete-post')
  .addEventListener('click', async (event) => {
    event.preventDefault();

    console.log(event);

    const postToDelete = document.querySelector("")
   
    if (postToDelete) {
      const response = await fetch('/api/posts/:id', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      console.log(response)

      if (response.ok) {
        console.log("post deleted!")
        document.location.assign('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  });