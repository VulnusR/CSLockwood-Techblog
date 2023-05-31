document
  .querySelector('#post-button')
  .addEventListener('click', async (event) => {
    event.preventDefault();

    const newPostTitle = document.querySelector('#new-post-title').value.trim();
    const newPost = document.querySelector('#new-post').value.trim();
   
    if (newPost) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ post_content: newPost, title: newPostTitle }),
        headers: { 'Content-Type': 'application/json' },
      });

      console.log(response)

      if (response.ok) {
        console.log("new post posted!")
        document.location.assign('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  });