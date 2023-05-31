document
  .querySelector('#add-comment')
  .addEventListener('click', async (event) => {
    event.preventDefault();

    console.log(event);

    const newComment = document.querySelector('#new-comment').value.trim();
    const postId = document.querySelector('#post-id').getAttribute('value')
    console.log('Post ID:')
    console.log(postId)
   
    if (newComment) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment_content: newComment, post_id: postId }),
        headers: { 'Content-Type': 'application/json' },
      });

      console.log(response)

      if (response.ok) {
        document.location.reload();
      } else {
        alert('You must be logged in to leave a comment!');
      }
    }
  });